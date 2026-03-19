package controllers

import (
	"context"

	arkhev1beta1 "arkhe-operator/api/v1beta1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

type PolaritonBatteryReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=arkhe.io,resources=polaritonbatteries,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=arkhe.io,resources=polaritonbatteries/status,verbs=get;update;patch

func (r *PolaritonBatteryReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	battery := &arkhev1beta1.PolaritonBattery{}
	if err := r.Get(ctx, req.NamespacedName, battery); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// Skeleton logic
	if battery.Status.ChargeLevel == 0 {
		battery.Status.ChargeLevel = 3.2
		if err := r.Status().Update(ctx, battery); err != nil {
			return ctrl.Result{}, err
		}
	}

	return ctrl.Result{}, nil
}

func (r *PolaritonBatteryReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&arkhev1beta1.PolaritonBattery{}).
		Complete(r)
}
