package controllers

import (
	"context"
	"math"

	arkhev1beta1 "arkhe-operator/api/v1beta1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

type ThermalEngineReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=arkhe.io,resources=thermalengines,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=arkhe.io,resources=thermalengines/status,verbs=get;update;patch

func (r *ThermalEngineReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	engine := &arkhev1beta1.ThermalEngine{}
	if err := r.Get(ctx, req.NamespacedName, engine); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// Calcula eficiência de Carnot: η = 1 - T_cold/T_hot
	hot := engine.Spec.HeatSource.Temperature
	cold := engine.Spec.CarnotLimit.ColdReservoir
	if hot == 0 {
		hot = 1.0 // Prevent division by zero
	}
	efficiency := 1.0 - (cold / hot)
	engine.Status.CurrentEfficiency = efficiency

	// Se universal, aplica transformação de informação
	if engine.Spec.Programmability.Universal {
		// Converte entropia em trabalho computacional
		work := engine.Spec.HeatSource.EntropyFlow * efficiency * math.Log(2)
		engine.Status.WorkDone = work
		engine.Status.EntropyProduced = engine.Spec.HeatSource.EntropyFlow * (1 - efficiency)

		// Fase: se eficiência > 0.5, está processando informação
		if efficiency > 0.5 {
			engine.Status.Phase = "Computing"
		} else {
			engine.Status.Phase = "Idle"
		}
	}

	if err := r.Status().Update(ctx, engine); err != nil {
		return ctrl.Result{}, err
	}
	return ctrl.Result{}, nil
}

func (r *ThermalEngineReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&arkhev1beta1.ThermalEngine{}).
		Complete(r)
}
