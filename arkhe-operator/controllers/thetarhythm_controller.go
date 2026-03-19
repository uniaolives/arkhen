package controllers

import (
	"context"
	"math"
	"time"

	arkhev1beta1 "arkhe-operator/api/v1beta1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

type ThetaRhythmReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=arkhe.io,resources=thetarhythms,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=arkhe.io,resources=thetarhythms/status,verbs=get;update;patch

func (r *ThetaRhythmReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	rhythm := &arkhev1beta1.ThetaRhythm{}
	if err := r.Get(ctx, req.NamespacedName, rhythm); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// Simula oscilação theta: f(t) = A * sin(2πft + φ)
	freq := rhythm.Spec.Frequency
	if freq == 0 {
		freq = 6.0 // Default 6Hz
	}

	// Calcula fase atual baseada no tempo
	now := time.Now().UnixNano() / 1e6 // ms
	cyclePeriod := 1000.0 / freq       // ms por ciclo
	currentPhaseRad := math.Mod(float64(now), cyclePeriod) / cyclePeriod * 2 * math.Pi

	// Determina estado: Encoding (0-π) vs Retrieval (π-2π)
	if currentPhaseRad < math.Pi {
		rhythm.Status.CurrentPhase = "Encoding"
		// Abre janela para injeção de dados na Bexorg
		r.openEncodingWindow(rhythm)
	} else {
		rhythm.Status.CurrentPhase = "Retrieval"
		// Ativa consolidação LTP
		r.triggerConsolidation(rhythm)
	}

	if err := r.Status().Update(ctx, rhythm); err != nil {
		return ctrl.Result{}, err
	}
	// Reconcile a cada 100ms (10Hz) para manter sincronia
	return ctrl.Result{RequeueAfter: 100 * time.Millisecond}, nil
}

func (r *ThetaRhythmReconciler) openEncodingWindow(rhythm *arkhev1beta1.ThetaRhythm) {
	// Sincroniza com Bexorg para injeção
}

func (r *ThetaRhythmReconciler) triggerConsolidation(rhythm *arkhev1beta1.ThetaRhythm) {
	// Aciona consolidação de memória
}

func (r *ThetaRhythmReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&arkhev1beta1.ThetaRhythm{}).
		Complete(r)
}
