package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// +kubebuilder:object:generate=true
type ProofVerifierSpec struct {
	// Language of the source program
	// +kubebuilder:validation:Enum=Solidity;Rust;Python;C;Cpp;K;Move;Cairo;Neural
	Language string `json:"language"`

	// Source code reference
	SourceRef SourceRef `json:"sourceRef,omitempty"`

	// SHA-256 of the source program
	// +kubebuilder:validation:Pattern=`^[0-9a-f]{64}$`
	ProgramHash string `json:"programHash"`

	// Program input
	Input ProofInput `json:"input,omitempty"`

	// Expected output
	ExpectedOutput ExpectedOutput `json:"expectedOutput"`

	// Verifier configuration
	VerifierConfig VerifierConfig `json:"verifierConfig,omitempty"`

	// Integration with Arkhe-Chain
	ChainIntegration ChainIntegration `json:"chainIntegration,omitempty"`

	// Integration with Bexorg for neural proofs
	NeuralIntegration NeuralIntegration `json:"neuralIntegration,omitempty"`
}

// +kubebuilder:object:generate=true
type SourceRef struct {
	ConfigMapRef *ConfigMapRef `json:"configMapRef,omitempty"`
	GitRef       *GitRef       `json:"gitRef,omitempty"`
}

// +kubebuilder:object:generate=true
type ConfigMapRef struct {
	Name string `json:"name"`
	Key  string `json:"key"`
}

// +kubebuilder:object:generate=true
type GitRef struct {
	Repository string `json:"repository"`
	Commit     string `json:"commit"`
	Path       string `json:"path"`
}

// +kubebuilder:object:generate=true
type ProofInput struct {
	// +kubebuilder:validation:Enum=Json;Binary;NeuralIntent;None
	Type string `json:"type"`
	Data string `json:"data,omitempty"`
}

// +kubebuilder:object:generate=true
type ExpectedOutput struct {
	// +kubebuilder:validation:Enum=Json;Binary;MerkleRoot;CoherenceScore
	Type      string  `json:"type"`
	Data      string  `json:"data"`
	Tolerance float64 `json:"tolerance,omitempty"`
}

// +kubebuilder:object:generate=true
type VerifierConfig struct {
	// +kubebuilder:validation:Enum=Groth16;Plonk;STARK;Halo2
	// +kubebuilder:default=Groth16
	ProofSystem string `json:"proofSystem,omitempty"`

	// +kubebuilder:validation:Minimum=100
	// +kubebuilder:validation:Maximum=256
	// +kubebuilder:default=128
	SecurityLevel int `json:"securityLevel,omitempty"`

	// +kubebuilder:default="5m"
	VerificationTimeout string `json:"verificationTimeout,omitempty"`
}

// +kubebuilder:object:generate=true
type ChainIntegration struct {
	// +kubebuilder:default=true
	SubmitToChain bool   `json:"submitToChain,omitempty"`
	WalletRef     string `json:"walletRef,omitempty"`
	GasLimit      int64  `json:"gasLimit,omitempty"`
	EraRef        string `json:"eraRef,omitempty"`
}

// +kubebuilder:object:generate=true
type NeuralIntegration struct {
	BexorgRef string `json:"bexorgRef,omitempty"`
	// +kubebuilder:default=0.95
	CoherenceThreshold float64 `json:"coherenceThreshold,omitempty"`
	ThetaPhase         float64 `json:"thetaPhase,omitempty"`
}

// +kubebuilder:object:generate=true
type ProofVerifierStatus struct {
	// +kubebuilder:validation:Enum=Pending;Computing;Proving;Verifying;Verified;Failed
	Phase string `json:"phase,omitempty"`

	Proof          *ProofStatus          `json:"proof,omitempty"`
	ZKCertificate  *ZKCertificateStatus  `json:"zkCertificate,omitempty"`
	Metrics        *VerificationMetrics  `json:"metrics,omitempty"`
	OnChainRef     *OnChainRef           `json:"onChainRef,omitempty"`
	Conditions     []metav1.Condition    `json:"conditions,omitempty"`
	StartTime      *metav1.Time          `json:"startTime,omitempty"`
	CompletionTime *metav1.Time          `json:"completionTime,omitempty"`
}

// +kubebuilder:object:generate=true
type ProofStatus struct {
	ProofHash string `json:"proofHash"`
	ProofType string `json:"proofType"`
	ProofData string `json:"proofData"`
	ProofSize int    `json:"proofSize"`
}

// +kubebuilder:object:generate=true
type ZKCertificateStatus struct {
	CertificateHash string `json:"certificateHash"`
	CertificateData string `json:"certificateData"`
	CircuitID       string `json:"circuitId"`
	VerificationKey string `json:"verificationKey"`
}

// +kubebuilder:object:generate=true
type VerificationMetrics struct {
	ComputeTime         string `json:"computeTime,omitempty"`
	ProofGenerationTime string `json:"proofGenerationTime,omitempty"`
	VerificationTime    string `json:"verificationTime,omitempty"`
	GasUsed             int64  `json:"gasUsed,omitempty"`
}

// +kubebuilder:object:generate=true
type OnChainRef struct {
	TxHash      string `json:"txHash"`
	BlockHeight int64  `json:"blockHeight"`
	EraRef      string `json:"eraRef"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status
//+kubebuilder:printcolumn:name="Language",type="string",JSONPath=".spec.language"
//+kubebuilder:printcolumn:name="Phase",type="string",JSONPath=".status.phase"
//+kubebuilder:printcolumn:name="Proof Hash",type="string",JSONPath=".status.proof.proofHash",priority=1
//+kubebuilder:printcolumn:name="Age",type="date",JSONPath=".metadata.creationTimestamp"

type ProofVerifier struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   ProofVerifierSpec   `json:"spec,omitempty"`
	Status ProofVerifierStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

type ProofVerifierList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []ProofVerifier `json:"items"`
}

func init() {
	SchemeBuilder.Register(&ProofVerifier{}, &ProofVerifierList{})
}
