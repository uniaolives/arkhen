BeginPackage["Arkhen`"]
Coherence[ω_, θ_] := <|"amplitude" -> ω, "phase" -> θ, "complex" -> ω Exp[I θ]|>
IsResonant[c_Association] := Abs[c["phase"] - Pi/2] < 0.1
EndPackage[]
