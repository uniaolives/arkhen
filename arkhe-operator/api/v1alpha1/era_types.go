package v1alpha1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// EraSpec defines the desired state of Era.
type EraSpec struct {
	// Index of the Era (0 = Genesis)
	Index int `json:"index"`

	// Block range for this Era
	BlockRange BlockRange `json:"blockRange"`

	// Target attention weight (alpha)
	AlphaWeight float64 `json:"alphaWeight"`

	// Thermal state of the Era
	ThermalState ThermalState `json:"thermalState"`

	// Compute resources allocated for processing this Era
	Resources CoreResourceSpec `json:"resources,omitempty"`
}

type BlockRange struct {
	Start int64 `json:"start"`
	End   int64 `json:"end"`
}

type ThermalState string

const (
	ThermalStateFrozen ThermalState = "Frozen"
	ThermalStateActive ThermalState = "Active"
)

type CoreResourceSpec struct {
	CPU    string `json:"cpu,omitempty"`
	Memory string `json:"memory,omitempty"`
}

// EraStatus defines the observed state of Era.
type EraStatus struct {
	TemperatureMilliKelvin float64            `json:"temperatureMilliKelvin"`
	Active                 bool               `json:"active"`
	EntropyNanoWatts       float64            `json:"entropyNanoWatts"`
	BlocksProcessed        int64              `json:"blocksProcessed"`
	MerkleRoot             string             `json:"merkleRoot"`
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
