package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// +kubebuilder:object:generate=true
type EmergencyTzinorSpec struct {
	// Frequency in Hz
	Frequency float64 `json:"frequency"`

	// +kubebuilder:validation:Enum=AM;FM;BPSK;QPSK;CW
	Modulation string `json:"modulation"`

	// Transmission power in dBm
	Power float64 `json:"power"`

	// Coverage radius in km
	CoverageRadius float64 `json:"coverageRadius"`

	AuthorizedNodes []string `json:"authorizedNodes,omitempty"`
}

// +kubebuilder:object:generate=true
type EmergencyTzinorStatus struct {
	Active         bool         `json:"active"`
	LastActivation *metav1.Time `json:"lastActivation,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status
//+kubebuilder:printcolumn:name="Freq",type="number",JSONPath=".spec.frequency"
//+kubebuilder:printcolumn:name="Active",type="boolean",JSONPath=".status.active"

type EmergencyTzinor struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   EmergencyTzinorSpec   `json:"spec,omitempty"`
	Status EmergencyTzinorStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

type EmergencyTzinorList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []EmergencyTzinor `json:"items"`
}

func init() {
	SchemeBuilder.Register(&EmergencyTzinor{}, &EmergencyTzinorList{})
}
