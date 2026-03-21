import Mathlib
import «arkhen»

namespace Arkhen

syntax "resonate" : tactic

macro_rules
| `(tactic| resonate) => `(tactic|
    simp [ComplexCoherence.IsResonant]
    try norm_num
    try linarith [Real.pi_pos]
  )

syntax "validate_substrate" term : tactic

macro_rules
| `(tactic| validate_substrate $s) => `(tactic|
    have h_valid : Coherent.validate $s := by
      simp [Coherent.validate, Coherent.coherence]
      try norm_num
    exact h_valid
  )

end Arkhen
