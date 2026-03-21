package controllers

import (
	"context"

	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"

	arkhev1alpha1 "arkhe-operator/api/v1alpha1"
	arkhev1beta1 "arkhe-operator/api/v1beta1"
)

// EntropyShieldReconciler reconciles an EntropyShield object.
type EntropyShieldReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

func (r *EntropyShieldReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	shield := &arkhev1alpha1.EntropyShield{}
	shield := &arkhev1beta1.EntropyShield{}
	if err := r.Get(ctx, req.NamespacedName, shield); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	shield.Status.Active = true
	shield.Status.CurrentEntropynW = shield.Spec.MaxEntropynW * 0.35
	if err := r.Status().Update(ctx, shield); err != nil {
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

func (r *EntropyShieldReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&arkhev1alpha1.EntropyShield{}).
		For(&arkhev1beta1.EntropyShield{}).
		Complete(r)
}
