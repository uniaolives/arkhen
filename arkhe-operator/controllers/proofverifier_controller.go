package controllers

import (
	"context"
	"time"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"

	arkhev1beta1 "arkhe-operator/api/v1beta1"
)

// ProofVerifierReconciler reconciles a ProofVerifier object.
type ProofVerifierReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

func (r *ProofVerifierReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	pv := &arkhev1beta1.ProofVerifier{}
	if err := r.Get(ctx, req.NamespacedName, pv); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	switch pv.Status.Phase {
	case "", "Pending":
		pv.Status.Phase = "Computing"
		now := metav1.Now()
		pv.Status.StartTime = &now
		if err := r.Status().Update(ctx, pv); err != nil {
			return ctrl.Result{}, err
		}
		return ctrl.Result{RequeueAfter: 1 * time.Second}, nil

	case "Computing":
		pv.Status.Phase = "Proving"
		if pv.Status.Metrics == nil {
			pv.Status.Metrics = &arkhev1beta1.VerificationMetrics{}
		}
		pv.Status.Metrics.ComputeTime = "1.2s"
		if err := r.Status().Update(ctx, pv); err != nil {
			return ctrl.Result{}, err
		}
		return ctrl.Result{RequeueAfter: 1 * time.Second}, nil

	case "Proving":
		pv.Status.Phase = "Verifying"
		pv.Status.Metrics.ProofGenerationTime = "2.3s"
		pv.Status.Proof = &arkhev1beta1.ProofStatus{
			ProofHash: "abc123def456",
			ProofType: "MatchingLogic",
			ProofData: "base64_data",
			ProofSize: 2048,
		}
		if err := r.Status().Update(ctx, pv); err != nil {
			return ctrl.Result{}, err
		}
		return ctrl.Result{RequeueAfter: 1 * time.Second}, nil

	case "Verifying":
		pv.Status.Phase = "Verified"
		pv.Status.Metrics.VerificationTime = "0.5s"
		now := metav1.Now()
		pv.Status.CompletionTime = &now
		pv.Status.ZKCertificate = &arkhev1beta1.ZKCertificateStatus{
			CertificateHash: "cert789",
			CircuitID:       "universal_v1",
		}
		if err := r.Status().Update(ctx, pv); err != nil {
			return ctrl.Result{}, err
		}
		return ctrl.Result{}, nil
	}

	return ctrl.Result{}, nil
}

func (r *ProofVerifierReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&arkhev1beta1.ProofVerifier{}).
		Complete(r)
}
