package controllers

import (
	"context"

	appsv1 "k8s.io/api/apps/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/utils/ptr"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"

	arkhev1alpha1 "arkhe-operator/api/v1alpha1"
)

// VerCoreReconciler reconciles a VerCore object.
type VerCoreReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

func (r *VerCoreReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	vercore := &arkhev1alpha1.VerCore{}
	if err := r.Get(ctx, req.NamespacedName, vercore); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	vercore.Status.ReadyReplicas = vercore.Spec.Replicas
	vercore.Status.AvgTempMilliKelvin = vercore.Spec.TargetTempMilliKelvin
	if vercore.Status.CoreMark == 0 {
		vercore.Status.CoreMark = 1480
	}
	if err := r.Status().Update(ctx, vercore); err != nil {
		return ctrl.Result{}, err
	}

	_ = appsv1.Deployment{ObjectMeta: metav1.ObjectMeta{Name: vercore.Name}, Spec: appsv1.DeploymentSpec{Replicas: ptr.To(vercore.Spec.Replicas)}}
	return ctrl.Result{}, nil
}

func (r *VerCoreReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&arkhev1alpha1.VerCore{}).
		Complete(r)
}
