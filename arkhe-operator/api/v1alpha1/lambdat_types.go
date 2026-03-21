package v1alpha1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// LambdaTSpec defines the desired state of LambdaT.
type LambdaTSpec struct {
	Handler        string      `json:"handler"`
	Image          string      `json:"image"`
	Trigger        TriggerSpec `json:"trigger"`
	CoherenceSigma float64     `json:"coherenceSigma"`
}

type TriggerSpec struct {
	Type       string  `json:"type"`
	LifetimePs float64 `json:"lifetimePs,omitempty"`
}

// LambdaTStatus defines the observed state of LambdaT.
type LambdaTStatus struct {
	Invocations int64   `json:"invocations"`
	AvgTimePs   float64 `json:"avgTimePs"`
	LastError   string  `json:"lastError,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

type LambdaT struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   LambdaTSpec   `json:"spec,omitempty"`
	Status LambdaTStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

type LambdaTList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []LambdaT `json:"items"`
}

func init() {
	SchemeBuilder.Register(&LambdaT{}, &LambdaTList{})
}
