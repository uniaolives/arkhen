package controllers

import (
	"context"
	"fmt"
	"math"

	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	arkhev1beta1 "arkhe-operator/api/v1beta1"
)

// TzinorReconciler reconciles a Tzinor object.
type TzinorReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=arkhe.io,resources=tzinors,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=arkhe.io,resources=tzinors/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=core,resources=services,verbs=get;list;watch;create;update;patch;delete

func (r *TzinorReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	logger := log.FromContext(ctx)

	tzinor := &arkhev1beta1.Tzinor{}
	if err := r.Get(ctx, req.NamespacedName, tzinor); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	desiredService := &corev1.Service{
		ObjectMeta: metav1.ObjectMeta{
			Name:      tzinor.Name,
			Namespace: tzinor.Namespace,
			Annotations: map[string]string{
				"arkhe.io/source-epoch": tzinor.Spec.SourceEpoch,
				"arkhe.io/target-epoch": tzinor.Spec.TargetEpoch,
				"arkhe.io/impedance":    fmt.Sprintf("%f", tzinor.Spec.Impedance),
			},
		},
		Spec: corev1.ServiceSpec{
			ClusterIP: "None",
			Selector: map[string]string{
				"arkhe.io/tzinor-name": tzinor.Name,
			},
			Ports: []corev1.ServicePort{
				{Name: "tunnel", Port: 62025, Protocol: corev1.ProtocolTCP},
			},
		},
	}

	if err := ctrl.SetControllerReference(tzinor, desiredService, r.Scheme); err != nil {
		return ctrl.Result{}, err
	}

	found := &corev1.Service{}
	err := r.Get(ctx, types.NamespacedName{Name: tzinor.Name, Namespace: tzinor.Namespace}, found)
	if err != nil && errors.IsNotFound(err) {
		logger.Info("Creating Service for Tzinor channel.")
		if err := r.Create(ctx, desiredService); err != nil {
			return ctrl.Result{}, err
		}
	} else if err != nil {
		return ctrl.Result{}, err
	}

	// Logic for v1beta1 fields
	z := tzinor.Spec.Impedance
	if math.Abs(z-3.87) > 0.5 {
		tzinor.Status.Phase = "Drifting"
	} else if tzinor.Status.Phase == "" || tzinor.Status.Phase == "Pending" {
		tzinor.Status.Phase = "Locked"
		tzinor.Status.Locked = true
		tzinor.Status.PhaseError = 0.003
		tzinor.Status.LatencyPicos = 0.25
	}

	if err := r.Status().Update(ctx, tzinor); err != nil {
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

func (r *TzinorReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&arkhev1beta1.Tzinor{}).
		Owns(&corev1.Service{}).
		Complete(r)
}
