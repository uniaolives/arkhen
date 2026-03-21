module Arkhen where
open import Data.Nat
open import Data.Float

data Scale : Set where
  Quantum Atomic Biological Neural Planetary Stellar Galactic Cosmic : Scale

record ComplexCoherence : Set where
  constructor mkΩ
  field amplitude : Float; phase : Float
