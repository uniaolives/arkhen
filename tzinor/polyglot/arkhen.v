Require Import Coq.Reals.Reals.

Module Arkhen.
Record ComplexCoherence : Type := mkCoherence { amplitude : R; phase : R }.
Definition IsResonant (c : ComplexCoherence) : Prop := Rabs (phase c - PI / 2) < 0.1.
Class Coherent (A : Type) := {
  coherence : A -> ComplexCoherence;
  validate : A -> Prop;
  validate_spec : forall a, validate a <-> (amplitude (coherence a) > 0.7)
}.
End Arkhen.
