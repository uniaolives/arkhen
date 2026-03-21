from arkhe_lang.k.engine import KEngine, Rule, Term

def get_primordial_engine() -> KEngine:
    engine = KEngine()
    s_atom = engine.declare_sort("GKPAtom")
    s_logic = engine.declare_sort("LogicValue")
    s_consciousness = engine.declare_sort("Consciousness")
    s_entropy = engine.declare_sort("Entropy")

    # Define tt, ff, undecided symbols
    tt = Term("tt", s_logic)
    ff = Term("ff", s_logic)
    undecided = Term("undecided", s_logic)

    # ERA 0-1: Primordial & GKP Logic
    # rule simplify(atom(?V, tt)) => tt
    # In this prototype, we define the symbols

    # ERA 2: Thermal (Mock)
    # rule dissipate(C(?S), ?G) => C(?S') requires S' = S * (1-G)

    return engine

def get_era_5_criticality(engine: KEngine) -> KEngine:
    s_float = engine.declare_sort("Float")
    s_command = engine.declare_sort("Command")

    # rule patch_gamma(0.005) => applied
    # This would be added to the rules list
    return engine
