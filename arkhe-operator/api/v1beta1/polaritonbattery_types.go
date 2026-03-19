package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// +kubebuilder:object:generate=true
// PolaritonBatterySpec defines the desired state of PolaritonBattery
type PolaritonBatterySpec struct {
	Microcavity MicrocavitySpec `json:"microcavity,omitempty"`
	Charging    ChargingSpec    `json:"charging,omitempty"`
	Storage     StorageSpec     `json:"storage,omitempty"`
}

// +kubebuilder:object:generate=true
type MicrocavitySpec struct {
	Material string `json:"material,omitempty"`
	Layers   int    `json:"layers,omitempty"`
	// +kubebuilder:validation:Enum=Strong;UltraStrong;DeepStrong
	Coupling string `json:"coupling,omitempty"`
}

// +kubebuilder:object:generate=true
type ChargingSpec struct {
	// +kubebuilder:validation:Enum=Laser;Wireless;Entanglement
	Method        string  `json:"method,omitempty"`
	PulseDuration float64 `json:"pulseDuration,omitempty"`
}

// +kubebuilder:object:generate=true
type StorageSpec struct {
	TargetLifetime  float64 `json:"targetLifetime,omitempty"`
	Superabsorption bool    `json:"superabsorption,omitempty"`
}

// +kubebuilder:object:generate=true
// PolaritonBatteryStatus defines the observed state of PolaritonBattery
type PolaritonBatteryStatus struct {
	ChargeLevel       float64 `json:"chargeLevel,omitempty"`
	StorageEfficiency float64 `json:"storageEfficiency,omitempty"`
	DecoherenceRate   float64 `json:"decoherenceRate,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

type PolaritonBattery struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   PolaritonBatterySpec   `json:"spec,omitempty"`
	Status PolaritonBatteryStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

type PolaritonBatteryList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []PolaritonBattery `json:"items"`
}

func init() {
	SchemeBuilder.Register(&PolaritonBattery{}, &PolaritonBatteryList{})
}
