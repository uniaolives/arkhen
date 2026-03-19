package v1alpha1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// TzinorSpec defines the desired state of Tzinor.
type TzinorSpec struct {
	SourceEpoch string   `json:"sourceEpoch"`
	TargetEpoch string   `json:"targetEpoch"`
	Impedance   float64  `json:"impedance"`
	LockMode    LockMode `json:"lockMode"`
}

type LockMode string

const (
	LockModeLocked   LockMode = "Locked"
	LockModeUnlocked LockMode = "Unlocked"
)

// TzinorStatus defines the observed state of Tzinor.
type TzinorStatus struct {
	Locked       bool               `json:"locked"`
	PhaseError   float64            `json:"phaseError"`
	LatencyPicos float64            `json:"latencyPicos"`
	Conditions   []metav1.Condition `json:"conditions,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

type Tzinor struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   TzinorSpec   `json:"spec,omitempty"`
	Status TzinorStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

type TzinorList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []Tzinor `json:"items"`
}

func init() {
	SchemeBuilder.Register(&Tzinor{}, &TzinorList{})
}
