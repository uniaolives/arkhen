package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// +kubebuilder:object:generate=true
// ThermalEngineSpec defines the desired state of ThermalEngine
type ThermalEngineSpec struct {
	HeatSource      HeatSourceSpec      `json:"heatSource"`
	WorkOutput      WorkOutputSpec      `json:"workOutput"`
	Programmability ProgrammabilitySpec `json:"programmability,omitempty"`
	CarnotLimit     CarnotLimitSpec     `json:"carnotLimit,omitempty"`
}

// +kubebuilder:object:generate=true
type HeatSourceSpec struct {
	Temperature float64 `json:"temperature"`
	EntropyFlow float64 `json:"entropyFlow"`
	// +kubebuilder:validation:Enum=Classical;Quantum;Biological;Cryogenic
	Type string `json:"type"`
}

// +kubebuilder:object:generate=true
type WorkOutputSpec struct {
	// +kubebuilder:validation:Enum=Mechanical;Electrical;Informational;Computational
	Form             string  `json:"form"`
	EfficiencyTarget float64 `json:"efficiencyTarget"`
}

// +kubebuilder:object:generate=true
type ProgrammabilitySpec struct {
	Universal      bool     `json:"universal,omitempty"`
	InstructionSet []string `json:"instructionSet,omitempty"`
}

// +kubebuilder:object:generate=true
type CarnotLimitSpec struct {
	HotReservoir  float64 `json:"hotReservoir,omitempty"`
	ColdReservoir float64 `json:"coldReservoir,omitempty"`
}

// +kubebuilder:object:generate=true
// ThermalEngineStatus defines the observed state of ThermalEngine
type ThermalEngineStatus struct {
	CurrentEfficiency float64 `json:"currentEfficiency,omitempty"`
	EntropyProduced   float64 `json:"entropyProduced,omitempty"`
	WorkDone          float64 `json:"workDone,omitempty"`
	// +kubebuilder:validation:Enum=Idle;Charging;Discharging;Reprogramming;Decohering;Computing
	Phase string `json:"phase,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

type ThermalEngine struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   ThermalEngineSpec   `json:"spec,omitempty"`
	Status ThermalEngineStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

type ThermalEngineList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []ThermalEngine `json:"items"`
}

func init() {
	SchemeBuilder.Register(&ThermalEngine{}, &ThermalEngineList{})
}
