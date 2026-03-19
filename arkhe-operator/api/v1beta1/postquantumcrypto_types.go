package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// +kubebuilder:object:generate=true
// PostQuantumCryptoSpec defines the desired state of PostQuantumCrypto
type PostQuantumCryptoSpec struct {
	// +kubebuilder:validation:Enum=Kyber512;Kyber768;Kyber1024;NTRU;SPHINCS
	Algorithm       string              `json:"algorithm,omitempty"`
	KeyDistribution KeyDistributionSpec `json:"keyDistribution,omitempty"`
	Lattice         LatticeSpec         `json:"lattice,omitempty"`
}

// +kubebuilder:object:generate=true
type KeyDistributionSpec struct {
	// +kubebuilder:validation:Enum=Classical;QKD;HD-QKD
	Method      string  `json:"method,omitempty"`
	FiberLength float64 `json:"fiberLength,omitempty"`
	SecureRate  float64 `json:"secureRate,omitempty"`
}

// +kubebuilder:object:generate=true
type LatticeSpec struct {
	Dimension int `json:"dimension,omitempty"`
	// +kubebuilder:validation:Enum=Ring-LWE;Module-LWE;Standard
	Structure string `json:"structure,omitempty"`
}

// +kubebuilder:object:generate=true
// PostQuantumCryptoStatus defines the observed state of PostQuantumCrypto
type PostQuantumCryptoStatus struct {
	// +kubebuilder:validation:Enum=NIST1;NIST3;NIST5
	SecurityLevel     string  `json:"securityLevel,omitempty"`
	QuantumResistance bool    `json:"quantumResistance,omitempty"`
	KeyRate           float64 `json:"keyRate,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

type PostQuantumCrypto struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   PostQuantumCryptoSpec   `json:"spec,omitempty"`
	Status PostQuantumCryptoStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

type PostQuantumCryptoList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []PostQuantumCrypto `json:"items"`
}

func init() {
	SchemeBuilder.Register(&PostQuantumCrypto{}, &PostQuantumCryptoList{})
}
