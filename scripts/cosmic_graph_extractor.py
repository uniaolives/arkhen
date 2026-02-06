
import os
import json
from pathlib import Path

def extract_graph(repo_path, output_file, depth=3):
    print(f"🔍 Extracting repository graph from {repo_path} (depth: {depth})")
    nodes = []
    edges = []

    root = Path(repo_path)
    for i, path in enumerate(root.rglob("*")):
        if ".git" in path.parts:
            continue
        if len(path.relative_to(root).parts) > depth:
            continue

        node_id = str(path.relative_to(root))
        nodes.append({
            "id": node_id,
            "type": "file" if path.is_file() else "dir",
            "size": os.path.getsize(path) if path.is_file() else 0
        })

        # Add edge to parent
        if node_id != ".":
            parent = str(path.parent.relative_to(root))
            edges.append({"source": parent, "target": node_id})

    graph = {"nodes": nodes, "links": edges}

    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, "w") as f:
        json.dump(graph, f, indent=2)
    print(f"✅ Graph extracted to {output_file}")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-path", default=".")
    parser.add_argument("--output", required=True)
    parser.add_argument("--depth", type=int, default=3)
    args = parser.parse_args()
    extract_graph(args.repo_path, args.output, args.depth)
