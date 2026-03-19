package controllers

import (
	"context"

	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"

	arkhev1alpha1 "arkhe-operator/api/v1alpha1"
)

// LambdaTReconciler reconciles a LambdaT object.
type LambdaTReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

func (r *LambdaTReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	lambda := &arkhev1alpha1.LambdaT{}
	if err := r.Get(ctx, req.NamespacedName, lambda); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	if lambda.Status.Invocations == 0 {
		lambda.Status.Invocations = 1
		lambda.Status.AvgTimePs = 0.25
	}
	if err := r.Status().Update(ctx, lambda); err != nil {
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

func (r *LambdaTReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&arkhev1alpha1.LambdaT{}).
		Complete(r)
}
