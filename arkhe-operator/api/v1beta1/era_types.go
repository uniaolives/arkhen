package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// +kubebuilder:object:generate=true
// EraSpec defines the desired state of Era.
type EraSpec struct {
	// Index of the Era (0 = Genesis)
	Index int `json:"index"`

	// Block range for this Era
	BlockRange BlockRange `json:"blockRange"`

	// Target attention weight (alpha)
	AlphaWeight float64 `json:"alphaWeight"`

	// Thermal state of the Era
	// +kubebuilder:validation:Enum=Frozen;Thawing;Active;Decohering;Shattered
	ThermalState string `json:"thermalState"`

	// Compute resources allocated for processing this Era
	Resources CoreResourceSpec `json:"resources,omitempty"`

	Annealing AnnealingSpec `json:"annealing,omitempty"`
	MerkleRoot string `json:"merkleRoot,omitempty"`
}

// +kubebuilder:object:generate=true
type BlockRange struct {
	Start int64 `json:"start"`
	End   int64 `json:"end"`
}

// +kubebuilder:object:generate=true
type AnnealingSpec struct {
	RampRate   float64 `json:"rampRate,omitempty"`
	TargetTemp float64 `json:"targetTemp,omitempty"`
}

// +kubebuilder:object:generate=true
type CoreResourceSpec struct {
	CPU    string `json:"cpu,omitempty"`
	Memory string `json:"memory,omitempty"`
}

// +kubebuilder:object:generate=true
// EraStatus defines the observed state of Era.
type EraStatus struct {
	// +kubebuilder:validation:Enum=Frozen;Thawing;Thawed;Active;Decohering
	Phase                  string             `json:"phase,omitempty"`
	TemperatureMilliKelvin float64            `json:"temperatureMilliKelvin,omitempty"`
	Active                 bool               `json:"active,omitempty"`
	EntropyNanoWatts       float64            `json:"entropyNanoWatts,omitempty"`
	BlocksProcessed        int64              `json:"blocksProcessed,omitempty"`
	MerkleRoot             string             `json:"merkleRoot,omitempty"`
	Coherence              float64            `json:"coherence,omitempty"`
	ActivePods             int                `json:"activePods,omitempty"`
	LastThawTime           *metav1.Time       `json:"lastThawTime,omitempty"`
	EntropyProduced        float64            `json:"entropyProduced,omitempty"`
	Conditions             []metav1.Condition `json:"conditions,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

type Era struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   EraSpec   `json:"spec,omitempty"`
	Status EraStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

type EraList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []Era `json:"items"`
}

func init() {
	SchemeBuilder.Register(&Era{}, &EraList{})
}
