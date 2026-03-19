package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// +kubebuilder:object:generate=true
// IoQTDeviceSpec defines the desired state of IoQTDevice
type IoQTDeviceSpec struct {
	QcaConfiguration QcaConfiguration `json:"qcaConfiguration"`
	// +kubebuilder:validation:Enum=Neural;Metabolic;QuantumField;Temporal
	SensorType     string             `json:"sensorType,omitempty"`
	ImplantLocation ImplantLocationSpec `json:"implantLocation,omitempty"`
	PowerSource    PowerSourceSpec    `json:"powerSource,omitempty"`
}

// +kubebuilder:object:generate=true
type QcaConfiguration struct {
	CellCount  int `json:"cellCount"`
	ClockZones int `json:"clockZones"`
	// +kubebuilder:validation:Enum=Molecular;Semiconductor;Metallic
	Fabrication string `json:"fabrication"`
}

// +kubebuilder:object:generate=true
type ImplantLocationSpec struct {
	Organ       string      `json:"organ,omitempty"`
	Coordinates Coordinates `json:"coordinates,omitempty"`
}

// +kubebuilder:object:generate=true
type Coordinates struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
	Z float64 `json:"z"`
}

// +kubebuilder:object:generate=true
type PowerSourceSpec struct {
	// +kubebuilder:validation:Enum=Polariton;Piezoelectric;Biological;Wireless
	Type       string `json:"type,omitempty"`
	BatteryRef string `json:"batteryRef,omitempty"`
}

// +kubebuilder:object:generate=true
// IoQTDeviceStatus defines the observed state of IoQTDevice
type IoQTDeviceStatus struct {
	Operational   bool    `json:"operational,omitempty"`
	TunnelingRate float64 `json:"tunnelingRate,omitempty"`
	ErrorRate     float64 `json:"errorRate,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

type IoQTDevice struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   IoQTDeviceSpec   `json:"spec,omitempty"`
	Status IoQTDeviceStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

type IoQTDeviceList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []IoQTDevice `json:"items"`
}

func init() {
	SchemeBuilder.Register(&IoQTDevice{}, &IoQTDeviceList{})
}
