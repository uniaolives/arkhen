import typing
from dataclasses import dataclass, field

class DecoherenceException(Exception):
    """Exception raised when ontological coherence falls below the threshold."""
    def __init__(self, message: str, omega: float, term: typing.Optional['Term'] = None):
        self.message = message
        self.omega = omega
        self.term = term
        super().__init__(self.message)

class BiologicalRupture(Exception):
    """Exception raised when the biological substrate fails."""
    def __init__(self, tissue_id: str, cause: str):
        self.tissue_id = tissue_id
        self.cause = cause
        super().__init__(f"[BIO_RUPTURE] Tissue {tissue_id}: {cause}")

@dataclass
class Sort:
    name: str
    subsorts: typing.List['Sort'] = field(default_factory=list)

    def __hash__(self):
        return hash(self.name)

    def __eq__(self, other):
        if not isinstance(other, Sort):
            return False
        return self.name == other.name

@dataclass
class Term:
    symbol: str
    sort: Sort
    children: typing.List['Term'] = field(default_factory=list)
    attributes: typing.Dict[str, typing.Any] = field(default_factory=dict)
    node_id: str = ""

    def __repr__(self):
        if not self.children:
            return f"{self.symbol}:{self.sort.name}"
        children_repr = ", ".join(repr(c) for c in self.children)
        return f"{self.symbol}({children_repr}):{self.sort.name}"

    def __eq__(self, other):
        if not isinstance(other, Term):
            return False
        return (self.symbol == other.symbol and
                self.sort == other.sort and
                self.children == other.children)

@dataclass
class Rule:
    left: Term
    right: Term
    condition: typing.Callable[[typing.Dict[str, Term]], bool] = lambda vars: True
    priority: int = 0
    name: str = ""

class KEngine:
    def __init__(self):
        self.sorts: typing.Dict[str, Sort] = {}
        self.rules: typing.List[Rule] = []
        self.config: typing.Dict[str, typing.Any] = {
            "omega": 1.0,
            "threshold": 0.85,
            "atp": 1.0
        }

    def declare_sort(self, name: str, subsorts: typing.List[str] = []) -> Sort:
        sort = Sort(name=name, subsorts=[self.sorts[s] for s in subsorts if s in self.sorts])
        self.sorts[name] = sort
        return sort

    def get_sort(self, name: str) -> typing.Optional[Sort]:
        return self.sorts.get(name)

    def add_rule(self, rule: Rule):
        self.rules.append(rule)
        self.rules.sort(key=lambda r: r.priority, reverse=True)

    def match(self, pattern: Term, term: Term, substitution: typing.Dict[str, Term]) -> bool:
        if pattern.symbol.startswith("?"):
            var_name = pattern.symbol[1:]
            if var_name in substitution:
                return substitution[var_name] == term
            substitution[var_name] = term
            return True

        if pattern.symbol != term.symbol:
            return False

        if not self._is_subsort(term.sort, pattern.sort):
            return False

        if len(pattern.children) != len(term.children):
            return False

        for p_child, t_child in zip(pattern.children, term.children):
            if not self.match(p_child, t_child, substitution):
                return False
        return True

    def _is_subsort(self, sub: Sort, parent: Sort) -> bool:
        if sub == parent:
            return True
        for s in sub.subsorts:
            if self._is_subsort(s, parent):
                return True
        return False

    def apply_substitution(self, pattern: Term, substitution: typing.Dict[str, Term]) -> Term:
        if pattern.symbol.startswith("?"):
            var_name = pattern.symbol[1:]
            return substitution.get(var_name, pattern)

        new_children = [self.apply_substitution(c, substitution) for c in pattern.children]
        return Term(pattern.symbol, pattern.sort, new_children, pattern.attributes)

    def rewrite_step(self, term: Term) -> typing.Optional[Term]:
        if self.config.get("omega", 1.0) < self.config.get("threshold", 0.0):
            raise DecoherenceException(f"Decoherence detected: Ω={self.config['omega']}", omega=self.config['omega'], term=term)

        if self.config.get("atp", 1.0) < 0.1:
            raise BiologicalRupture(tissue_id="bexorg_01", cause="Mitochondrial Failure")

        for rule in self.rules:
            substitution = {}
            if self.match(rule.left, term, substitution):
                if rule.condition(substitution):
                    return self.apply_substitution(rule.right, substitution)

        for i, child in enumerate(term.children):
            new_child = self.rewrite_step(child)
            if new_child:
                new_children = term.children[:]
                new_children[i] = new_child
                return Term(term.symbol, term.sort, new_children, term.attributes)

        return None

    def rewrite(self, term: Term, max_steps: int = 100) -> Term:
        current = term
        for _ in range(max_steps):
            try:
                next_term = self.rewrite_step(current)
                if not next_term or next_term == current:
                    break
                current = next_term
            except DecoherenceException as e:
                recovery_rule = next((r for r in self.rules if r.name == "recovery"), None)
                if recovery_rule:
                    print(f"Applying ontological recovery for decoherence at Ω={e.omega}")
                    self.config["omega"] = 1.0
                    current = recovery_rule.right
                else:
                    raise e
            except BiologicalRupture as e:
                print(f"CRITICAL BIO-ERROR: {e.cause}. Dispatching organelle rescue...")
                self.config["atp"] = 0.9
                current = Term("rescue_in_progress", current.sort)
        return current

if __name__ == "__main__":
    print("KEngine v3.0 (Mitochondrial Aware) loaded.")
