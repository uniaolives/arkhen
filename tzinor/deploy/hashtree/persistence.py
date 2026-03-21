# tzinor/deploy/hashtree/persistence.py
import os
import json
import logging
import subprocess
import time
from typing import Optional, List

class HashtreePersistence:
    """
    Manages decentralized model checkpoint persistence using the Hashtree protocol.
    Handles local caching (IndexedDB simulation) and background uploads to Blossom servers.
    """
    def __init__(self, htree_bin: str = "htree", blossom_servers: Optional[List[str]] = None):
        self.htree_bin = htree_bin
        self.blossom_servers = blossom_servers or ["https://blossom.teknet.io"]
        self.logger = logging.getLogger("hashtree.persistence")

    def save_checkpoint(self, checkpoint_path: str, metadata: dict) -> Optional[str]:
        """
        Saves a model checkpoint to Hashtree.
        Calculates Merkle Root and returns the nhash permalink.
        """
        self.logger.info(f"Preparing decentralized persistence for {checkpoint_path}")

        # 1. Store metadata and state mapping
        meta_file = os.path.join(checkpoint_path, "arkhe_metadata.json")
        with open(meta_file, 'w') as f:
            json.dump(metadata, f)

        # 2. Add to local Content-Addressed Storage (Merkle Tree)
        try:
            # htree add <path> returns the root hash
            result = subprocess.run(
                [self.htree_bin, "add", checkpoint_path],
                capture_output=True, text=True, check=True
            )
            root_hash = result.stdout.strip()
            self.logger.info(f"Merkle Root generated: {root_hash}")

            # 3. Simulate background upload to Blossom servers
            self._background_blossom_push(root_hash)

            # 4. Resolve nhash permalink (npub/path form)
            # In production: resolve via Nostr relay kind 30078
            nhash = f"nhash://self/{metadata.get('step', 'latest')}"
            return nhash

        except Exception as e:
            self.logger.error(f"Hashtree persistence failed: {e}")
            return None

    def _background_blossom_push(self, root_hash: str):
        """Simulates the background push to Blossom servers for decentralized CDN distribution."""
        for server in self.blossom_servers:
            self.logger.info(f"Pushing content hash {root_hash} to Blossom server: {server}")
            # subprocess.run([self.htree_bin, "push", "--server", server, root_hash])

    def load_checkpoint(self, nhash: str, target_path: str):
        """Retrieves a checkpoint from the P2P network using its nhash."""
        self.logger.info(f"Fetching decentralized content from {nhash}")
        try:
            subprocess.run(
                [self.htree_bin, "get", nhash, "-o", target_path],
                check=True
            )
        except Exception as e:
            self.logger.error(f"Failed to fetch from Hashtree: {e}")

class IndexedDBCache:
    """Simulation of browser-level IndexedDB caching for Hashtree workers."""
    def __init__(self, cache_dir: str = "/tmp/arkhe_cache"):
        self.cache_dir = cache_dir
        os.makedirs(cache_dir, exist_ok=True)

    def put(self, key: str, blob: bytes):
        with open(os.path.join(self.cache_dir, key), 'wb') as f:
            f.write(blob)

    def get(self, key: str) -> Optional[bytes]:
        path = os.path.join(self.cache_dir, key)
        if os.path.exists(path):
            with open(path, 'rb') as f:
                return f.read()
        return None
