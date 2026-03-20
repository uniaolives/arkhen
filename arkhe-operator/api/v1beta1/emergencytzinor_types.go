package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// +kubebuilder:object:generate=true
// EmergencyTzinorSpec defines the desired state of EmergencyTzinor.
type EmergencyTzinorSpec struct {
	Frequency        float64  `json:"frequency"`
	Modulation       string   `json:"modulation"`
	Power            int      `json:"power"` // watts
	CoverageRadiusKm int      `json:"coverageRadiusKm"`
	AuthorizedNodes  []string `json:"authorizedNodes"`
}

// +kubebuilder:object:generate=true
// EmergencyTzinorStatus defines the observed state of EmergencyTzinor.
type EmergencyTzinorStatus struct {
	Active         bool         `json:"active"`
	LastActivation *metav1.Time `json:"lastActivation,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

// EmergencyTzinor is the Schema for the emergencytzinors API
type EmergencyTzinor struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   EmergencyTzinorSpec   `json:"spec,omitempty"`
	Status EmergencyTzinorStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

// EmergencyTzinorList contains a list of EmergencyTzinor
type EmergencyTzinorList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []EmergencyTzinor `json:"items"`
}

func init() {
	SchemeBuilder.Register(&EmergencyTzinor{}, &EmergencyTzinorList{})
}
