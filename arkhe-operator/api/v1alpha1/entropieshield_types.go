package v1alpha1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// EntropyShieldSpec defines the desired state of EntropyShield.
type EntropyShieldSpec struct {
	MaxEntropynW            float64      `json:"maxEntropynW"`
	CriticalTempMilliKelvin float64      `json:"criticalTempMilliKelvin"`
	BreachAction            BreachAction `json:"breachAction"`
}

type BreachAction string

const (
	BreachActionLog       BreachAction = "Log"
	BreachActionIsolate   BreachAction = "Isolate"
	BreachActionTerminate BreachAction = "Terminate"
)

// EntropyShieldStatus defines the observed state of EntropyShield.
type EntropyShieldStatus struct {
	CurrentEntropynW   float64 `json:"currentEntropynW"`
	AttacksNeutralized int     `json:"attacksNeutralized"`
	Active             bool    `json:"active"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

type EntropyShield struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   EntropyShieldSpec   `json:"spec,omitempty"`
	Status EntropyShieldStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

type EntropyShieldList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []EntropyShield `json:"items"`
}

func init() {
	SchemeBuilder.Register(&EntropyShield{}, &EntropyShieldList{})
}
