-- tzinor/ml/training_resonance.lean
-- FORMAL PROOF OF TRAINING RESONANCE

import Mathlib.Data.Real.Basic

def k1 : ℝ := 0.015311

def ProperTime (ρ : ℝ) : ℝ := 1 - k1 * ρ

theorem training_resonance_stability (ρ : ℝ) (h : ρ < 0.25) :
  ProperTime ρ > 0.9 := by
  simp [ProperTime, k1]
  have h1 : 0.015311 * ρ < 0.015311 * 0.25 := by
    apply mul_lt_mul_of_pos_left h
    norm_num
  have h2 : 0.015311 * 0.25 < 0.1 := by norm_num
  linarith
