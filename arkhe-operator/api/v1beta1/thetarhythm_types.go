package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// ThetaRhythmSpec defines the desired state of ThetaRhythm
type ThetaRhythmSpec struct {
	Frequency               float64    `json:"frequency,omitempty"`
	Phase                   float64    `json:"phase,omitempty"`
	Amplitude               float64    `json:"amplitude,omitempty"`
	EncodingWindow          float64    `json:"encodingWindow,omitempty"`
	RetrievalWindow         float64    `json:"retrievalWindow,omitempty"`
	Target                  TargetSpec `json:"target,omitempty"`
	AcetylcholineModulation bool       `json:"acetylcholineModulation,omitempty"`
}

type TargetSpec struct {
	BexorgRef string `json:"bexorgRef,omitempty"`
	// +kubebuilder:validation:Enum=Hippocampus;Prefrontal;Parietal;Temporal
	CortexRegion string `json:"cortexRegion,omitempty"`
}

// ThetaRhythmStatus defines the observed state of ThetaRhythm
type ThetaRhythmStatus struct {
	// +kubebuilder:validation:Enum=Encoding;Retrieval;Transition
	CurrentPhase        string  `json:"currentPhase,omitempty"`
	Coherence           float64 `json:"coherence,omitempty"`
	MemoryConsolidation float64 `json:"memoryConsolidation,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

type ThetaRhythm struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   ThetaRhythmSpec   `json:"spec,omitempty"`
	Status ThetaRhythmStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

type ThetaRhythmList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []ThetaRhythm `json:"items"`
}

func init() {
	SchemeBuilder.Register(&ThetaRhythm{}, &ThetaRhythmList{})
}
