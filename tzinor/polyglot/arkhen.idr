module Arkhen
record ComplexCoherence where
  constructor MkΩ
  amplitude : Double
  phase : Double

IsResonant : ComplexCoherence -> Bool
IsResonant c = abs (phase c - pi/2) < 0.1
