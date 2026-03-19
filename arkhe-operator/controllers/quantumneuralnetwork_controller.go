package controllers

import (
	"context"

	arkhev1beta1 "arkhe-operator/api/v1beta1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

type QuantumNeuralNetworkReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=arkhe.io,resources=quantumneuralnetworks,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=arkhe.io,resources=quantumneuralnetworks/status,verbs=get;update;patch

func (r *QuantumNeuralNetworkReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	qnn := &arkhev1beta1.QuantumNeuralNetwork{}
	if err := r.Get(ctx, req.NamespacedName, qnn); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// Skeleton logic
	if qnn.Status.Accuracy == 0 {
		qnn.Status.Accuracy = 0.936
		if err := r.Status().Update(ctx, qnn); err != nil {
			return ctrl.Result{}, err
		}
	}

	return ctrl.Result{}, nil
}

func (r *QuantumNeuralNetworkReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&arkhev1beta1.QuantumNeuralNetwork{}).
		Complete(r)
}
