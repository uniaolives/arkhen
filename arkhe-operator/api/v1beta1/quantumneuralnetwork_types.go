package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// +kubebuilder:object:generate=true
// QuantumNeuralNetworkSpec defines the desired state of QuantumNeuralNetwork
type QuantumNeuralNetworkSpec struct {
	// +kubebuilder:validation:Enum=HQCNN;QENSSF;Variational;Circuit
	Architecture string `json:"architecture,omitempty"`
	// +kubebuilder:validation:Enum=ArrhythmiaDetection;RareDisease;fMRIAnalysis;Genomic
	Application string       `json:"application,omitempty"`
	Training    TrainingSpec `json:"training,omitempty"`
	HardwareBackend []string `json:"hardwareBackend,omitempty"`
}

// +kubebuilder:object:generate=true
type TrainingSpec struct {
	Federated bool `json:"federated,omitempty"`
	// +kubebuilder:validation:Enum=QEDP;Differential;None
	Privacy string `json:"privacy,omitempty"`
}

// +kubebuilder:object:generate=true
// QuantumNeuralNetworkStatus defines the observed state of QuantumNeuralNetwork
type QuantumNeuralNetworkStatus struct {
	Accuracy             float64 `json:"accuracy,omitempty"`
	QuantumAdvantage     bool    `json:"quantumAdvantage,omitempty"`
	EntanglementFidelity float64 `json:"entanglementFidelity,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

type QuantumNeuralNetwork struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   QuantumNeuralNetworkSpec   `json:"spec,omitempty"`
	Status QuantumNeuralNetworkStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

type QuantumNeuralNetworkList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []QuantumNeuralNetwork `json:"items"`
}

func init() {
	SchemeBuilder.Register(&QuantumNeuralNetwork{}, &QuantumNeuralNetworkList{})
}
