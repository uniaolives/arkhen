package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// +kubebuilder:object:generate=true
type EmbodiedAgentSpec struct {
	// +kubebuilder:validation:Enum=Microswimmer;BexorgNeuron;VerCoreCore;IoQTDevice
	AgentType string `json:"agentType"`

	Environment EnvironmentSpec `json:"environment"`

	// Número de ações discretas disponíveis
	Actions int32 `json:"actions"`

	Learning LearningSpec `json:"learning"`
}

// +kubebuilder:object:generate=true
type EnvironmentSpec struct {
	// +kubebuilder:validation:Enum=Hydrodynamic;Thermal;Chemical;Electromagnetic
	Perturbations string `json:"perturbations"`

	// +kubebuilder:validation:Enum=Full;Partial;Hidden
	Observability string `json:"observability"`
}

// +kubebuilder:object:generate=true
type LearningSpec struct {
	// +kubebuilder:validation:Enum=PPO;QLearning;PolicyGradient
	Algorithm string `json:"algorithm"`

	Episodes int32 `json:"episodes"`

	RewardFunction string `json:"rewardFunction"`
}

// +kubebuilder:object:generate=true
type EmbodiedAgentStatus struct {
	// Política aprendida (serializada)
	Policy string `json:"policy,omitempty"`

	ConvergenceEpisodes int32 `json:"convergenceEpisodes,omitempty"`

	Efficiency float64 `json:"efficiency,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status
//+kubebuilder:printcolumn:name="Type",type="string",JSONPath=".spec.agentType"
//+kubebuilder:printcolumn:name="Converged",type="integer",JSONPath=".status.convergenceEpisodes"

type EmbodiedAgent struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   EmbodiedAgentSpec   `json:"spec,omitempty"`
	Status EmbodiedAgentStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

type EmbodiedAgentList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []EmbodiedAgent `json:"items"`
}

func init() {
	SchemeBuilder.Register(&EmbodiedAgent{}, &EmbodiedAgentList{})
}
