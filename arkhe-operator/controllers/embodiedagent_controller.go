package controllers

import (
	"context"

	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"

	arkhev1beta1 "arkhe-operator/api/v1beta1"
)

// EmbodiedAgentReconciler reconciles a EmbodiedAgent object.
type EmbodiedAgentReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

func (r *EmbodiedAgentReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	agent := &arkhev1beta1.EmbodiedAgent{}
	if err := r.Get(ctx, req.NamespacedName, agent); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	if agent.Status.Efficiency == 0 {
		agent.Status.Efficiency = 0.85
		agent.Status.ConvergenceEpisodes = 500
		agent.Status.Policy = "learned_policy_v1"
		if err := r.Status().Update(ctx, agent); err != nil {
			return ctrl.Result{}, err
		}
	}

	return ctrl.Result{}, nil
}

func (r *EmbodiedAgentReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&arkhev1beta1.EmbodiedAgent{}).
		Complete(r)
}
