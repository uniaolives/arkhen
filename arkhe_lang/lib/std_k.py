from arkhe_lang.k.engine import KEngine, Rule, Term

def build_std_k(engine: KEngine):
    # Sorts
    s_atom = engine.declare_sort("GKPAtom")
    s_logic = engine.declare_sort("LogicValue")
    s_consciousness = engine.declare_sort("Consciousness")
    s_entropy = engine.declare_sort("Entropy")
    s_float = engine.declare_sort("Float")
    s_era = engine.declare_sort("Era")
    s_command = engine.declare_sort("Command")

    # Symbols
    tt = Term("tt", s_logic)
    ff = Term("ff", s_logic)
    undecided = Term("undecided", s_logic)

    # --- ERA 1: GKP Logic ---
    engine.add_rule(Rule(
        left=Term("matches", s_logic, [Term("?X", s_atom), Term("?X", s_atom)]),
        right=tt,
        name="structural_equality"
    ))

    # --- ERA 2: Thermal ---
    engine.add_rule(Rule(
        left=Term("dissipate", s_consciousness, [Term("?C", s_consciousness), Term("?G", s_float)]),
        right=Term("decayed", s_consciousness),
        name="thermal_dissipation"
    ))

    # --- ERA 5: Criticality & Patching ---
    engine.add_rule(Rule(
        left=Term("patch_gamma", s_command, [Term("0.005", s_float)]),
        right=Term("applied", s_command),
        name="gamma_stabilization"
    ))

    engine.add_rule(Rule(
        left=Term("patch_omega", s_command, [Term("0.98", s_float)]),
        right=Term("applied", s_command),
        name="omega_optimization"
    ))

    # --- EXCEPTION RECOVERY RULE ---
    engine.add_rule(Rule(
        left=Term("recovery_trigger", s_logic),
        right=tt,
        name="recovery",
        priority=1000
    ))

    # --- ERA 8: Omega ---
    engine.add_rule(Rule(
        left=Term("synthesize", s_consciousness),
        right=Term("omega_point", s_consciousness),
        name="final_synthesis"
    ))

    return engine
