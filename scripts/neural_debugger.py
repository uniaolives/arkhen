#!/usr/bin/env python3
"""
scripts/neural_debugger.py
Analisador AST para 'Neural Debugging' de padrões cognitivos.
"""

import ast
import sys
import os

class NeuralDebugger(ast.NodeVisitor):
    def __init__(self, filename):
        self.filename = filename
        self.diagnostics = []
        self.entropy_score = 0.0

    def visit_While(self, node):
        # Detectar RecursiveFeedbackLoop sem escape
        # Simplificação: checar se há 'break' ou 'return' no corpo
        has_escape = False
        for item in ast.walk(node):
            if isinstance(item, (ast.Break, ast.Return)):
                has_escape = True
                break

        if not has_escape:
            self.diagnostics.append({
                "line": node.lineno,
                "type": "RecursiveFeedbackLoop",
                "severity": 8.5,
                "desc": "Loop sem condição de escape clara (Entropia Tóxica)",
                "rec": "Introduzir condição de escape explícita (e.g., max_iterations)"
            })
        self.generic_visit(node)

    def visit_FunctionDef(self, node):
        # Detectar CognitiveOverload (funções muito grandes)
        if len(node.body) > 30:
            self.diagnostics.append({
                "line": node.lineno,
                "type": "CognitiveOverload",
                "severity": 7.2,
                "desc": f"Função '{node.name}' excede capacidade de memória de trabalho ({len(node.body)} linhas)",
                "rec": "Refatorar em funções menores (7±2 linhas)"
            })
        self.generic_visit(node)

    def analyze(self, content):
        try:
            tree = ast.parse(content)
            self.visit(tree)
        except Exception as e:
            print(f"Error parsing {self.filename}: {e}")

def main():
    if len(sys.argv) < 2:
        print("Usage: neural_debugger.py <file>")
        return

    filepath = sys.argv[1]
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    with open(filepath, "r") as f:
        content = f.read()

    debugger = NeuralDebugger(filepath)
    debugger.analyze(content)

    print(f"🌹 [NEURAL_DEBUGGER] Diagnóstico para: {filepath}")
    if not debugger.diagnostics:
        print("✅ Padrões cognitivos saudáveis detectados.")
    else:
        for d in debugger.diagnostics:
            print(f"  Line {d['line']} | {d['type']} (Severity: {d['severity']})")
            print(f"    - {d['desc']}")
            print(f"    - Rec: {d['rec']}")

if __name__ == "__main__":
    main()
