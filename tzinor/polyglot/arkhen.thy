theory Arkhen
  imports Main
begin
record complex_coherence = amplitude :: real phase :: real
definition is_resonant :: "complex_coherence => bool" where
  "is_resonant c = (|phase c - pi/2| < 0.1)"
end
