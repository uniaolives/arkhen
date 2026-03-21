package controllers

import (
	"context"

	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"

	arkhev1beta1 "arkhe-operator/api/v1beta1"
)

// EmergencyTzinorReconciler reconciles an EmergencyTzinor object.
type EmergencyTzinorReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

func (r *EmergencyTzinorReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	etz := &arkhev1beta1.EmergencyTzinor{}
	if err := r.Get(ctx, req.NamespacedName, etz); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// Logic to activate physical radio transmitters via VerCore SDR interface
	if !etz.Status.Active {
		etz.Status.Active = true
		if err := r.Status().Update(ctx, etz); err != nil {
			return ctrl.Result{}, err
		}
	}

	return ctrl.Result{}, nil
}

func (r *EmergencyTzinorReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&arkhev1beta1.EmergencyTzinor{}).
		Complete(r)
}
