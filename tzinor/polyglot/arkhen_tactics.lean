-- tzinor/polyglot/arkhen_tactics.lean
-- Táticas Lean 4 customizadas para provas Arkhe(n)

import Mathlib
import Arkhen.Core

-- ═══════════════════════════════════════════════════════════════════════
-- TÁTICAS CUSTOMIZADAS
-- ═══════════════════════════════════════════════════════════════════════

/-- Tática para provar ressonância automaticamente -/
import Mathlib
import «arkhen»

namespace Arkhen

syntax "resonate" : tactic

macro_rules
| `(tactic| resonate) => `(tactic|
    simp [ComplexCoherence.isResonant];
    try norm_num;
    try linarith [Real.pi_pos]
  )

/-- Tática para validação de substrato -/
    simp [ComplexCoherence.IsResonant]
    try norm_num
    try linarith [Real.pi_pos]
  )

syntax "validate_substrate" term : tactic

macro_rules
| `(tactic| validate_substrate $s) => `(tactic|
    have h_valid : ComplexCoherence.isResonant (OntoState.coherence $s) := by {
      simp [ComplexCoherence.isResonant, OntoState.coherence];
      norm_num;
      try { native_decide }
    };
    exact h_valid
  )
    have h_valid : Coherent.validate $s := by
      simp [Coherent.validate, Coherent.coherence]
      try norm_num
    exact h_valid
  )

end Arkhen
