package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// +kubebuilder:object:generate=true
// TzinorSpec defines the desired state of Tzinor.
type TzinorSpec struct {
	Origin        OriginSpec      `json:"origin"`
	Destination   DestinationSpec `json:"destination"`
	Impedance     float64         `json:"impedance"`
	Bandwidth     string          `json:"bandwidth,omitempty"`
	// +kubebuilder:validation:Enum=Unidirectional;Bidirectional;Superposition
	Mode          string          `json:"mode,omitempty"`
	Pll           PllSpec         `json:"pll,omitempty"`
	EntropyShield bool            `json:"entropyShield,omitempty"`

	// Compatibility fields
	SourceEpoch string   `json:"sourceEpoch,omitempty"`
	TargetEpoch string   `json:"targetEpoch,omitempty"`
}

// +kubebuilder:object:generate=true
type OriginSpec struct {
	Timestamp   *metav1.Time `json:"timestamp,omitempty"`
	EraRef      string       `json:"eraRef,omitempty"`
	BlockHeight int64        `json:"blockHeight,omitempty"`
}

// +kubebuilder:object:generate=true
type DestinationSpec struct {
	Timestamp *metav1.Time `json:"timestamp,omitempty"`
	EraRef    string       `json:"eraRef,omitempty"`
}

// +kubebuilder:object:generate=true
type PllSpec struct {
	Kp          float64 `json:"kp,omitempty"`
	Ki          float64 `json:"ki,omitempty"`
	TargetSigma int     `json:"targetSigma,omitempty"`
}

// +kubebuilder:object:generate=true
// TzinorStatus defines the observed state of Tzinor.
type TzinorStatus struct {
	// +kubebuilder:validation:Enum=Pending;Locking;Locked;Drifting;Decohered;Closed
	Phase         string             `json:"phase,omitempty"`
	DeltaPhi      float64            `json:"deltaPhi,omitempty"`
	ChannelId     string             `json:"channelId,omitempty"`
	CoherenceTime float64            `json:"coherenceTime,omitempty"`
	Locked        bool               `json:"locked,omitempty"`
	PhaseError    float64            `json:"phaseError,omitempty"`
	LatencyPicos  float64            `json:"latencyPicos,omitempty"`
	Conditions    []metav1.Condition `json:"conditions,omitempty"`
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
