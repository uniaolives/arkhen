package controllers

import (
	"context"

	arkhev1beta1 "arkhe-operator/api/v1beta1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

type PostQuantumCryptoReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=arkhe.io,resources=postquantumcryptos,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=arkhe.io,resources=postquantumcryptos/status,verbs=get;update;patch

func (r *PostQuantumCryptoReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	pqc := &arkhev1beta1.PostQuantumCrypto{}
	if err := r.Get(ctx, req.NamespacedName, pqc); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// Skeleton logic
	if !pqc.Status.QuantumResistance {
		pqc.Status.QuantumResistance = true
		if err := r.Status().Update(ctx, pqc); err != nil {
			return ctrl.Result{}, err
		}
	}

	return ctrl.Result{}, nil
}

func (r *PostQuantumCryptoReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&arkhev1beta1.PostQuantumCrypto{}).
		Complete(r)
}
