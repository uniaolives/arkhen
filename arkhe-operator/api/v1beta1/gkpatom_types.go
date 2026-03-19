package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// +kubebuilder:object:generate=true
// GKPAtomSpec defines the desired state of GKPAtom
type GKPAtomSpec struct {
	// +kubebuilder:validation:Enum=Ytterbium-171;Calcium-40;Beryllium-9;Magnesium-25
	AtomicSpecies     string            `json:"atomicSpecies"`
	TrapConfiguration TrapConfiguration `json:"trapConfiguration"`
	GkpEncoding       GkpEncodingSpec   `json:"gkpEncoding,omitempty"`
	VibrationalModes  []VibrationalMode `json:"vibrationalModes,omitempty"`
}

// +kubebuilder:object:generate=true
type TrapConfiguration struct {
	Type        string  `json:"type,omitempty"`
	Dimensions  int     `json:"dimensions,omitempty"`
	RfFrequency float64 `json:"rfFrequency,omitempty"`
}

// +kubebuilder:object:generate=true
type GkpEncodingSpec struct {
	LogicalQubits   int     `json:"logicalQubits,omitempty"`
	ErrorCorrection bool    `json:"errorCorrection,omitempty"`
	Squeezing       float64 `json:"squeezing,omitempty"`
}

// +kubebuilder:object:generate=true
type VibrationalMode struct {
	ModeId     int     `json:"modeId"`
	Frequency  float64 `json:"frequency"`
	Occupation int     `json:"occupation,omitempty"`
}

// +kubebuilder:object:generate=true
// GKPAtomStatus defines the observed state of GKPAtom
type GKPAtomStatus struct {
	CoherenceTime float64          `json:"coherenceTime,omitempty"`
	GateFidelity  float64          `json:"gateFidelity,omitempty"`
	Entanglement  EntanglementStatus `json:"entanglement,omitempty"`
}

// +kubebuilder:object:generate=true
type EntanglementStatus struct {
	ModeA    int     `json:"modeA,omitempty"`
	ModeB    int     `json:"modeB,omitempty"`
	Fidelity float64 `json:"fidelity,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

type GKPAtom struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   GKPAtomSpec   `json:"spec,omitempty"`
	Status GKPAtomStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

type GKPAtomList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []GKPAtom `json:"items"`
}

func init() {
	SchemeBuilder.Register(&GKPAtom{}, &GKPAtomList{})
}
