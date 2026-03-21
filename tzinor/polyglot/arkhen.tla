---- MODULE Arkhen ----
EXTENDS Naturals, Reals
VARIABLES coherence
IsResonant(c) == Abs(c.phase - 1.57079632679) < 0.1
====
