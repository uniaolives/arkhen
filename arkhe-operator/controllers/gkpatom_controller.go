package controllers

import (
	"context"

	arkhev1beta1 "arkhe-operator/api/v1beta1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

type GKPAtomReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=arkhe.io,resources=gkpatoms,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=arkhe.io,resources=gkpatoms/status,verbs=get;update;patch

func (r *GKPAtomReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	atom := &arkhev1beta1.GKPAtom{}
	if err := r.Get(ctx, req.NamespacedName, atom); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// Skeleton logic
	if atom.Status.CoherenceTime == 0 {
		atom.Status.CoherenceTime = 142.0
		if err := r.Status().Update(ctx, atom); err != nil {
			return ctrl.Result{}, err
		}
	}

	return ctrl.Result{}, nil
}

func (r *GKPAtomReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&arkhev1beta1.GKPAtom{}).
		Complete(r)
}
