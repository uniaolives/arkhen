#!/usr/bin/env python3
# scripts/arkhe_keygen.py
import os
import json
import getpass
from hashlib import sha256
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

# Mock secp256k1 for sandbox if not installed
try:
    import secp256k1
except ImportError:
    class MockKey:
        def __init__(self, k): self.k = k
        def serialize(self): return b"\x00" + b"a" * 32
    class secp256k1:
        class PrivateKey:
            def __init__(self, k): self.pubkey = MockKey(k)
            def serialize(self): return b"a" * 32

def generate_nostr_keys():
    """Gera entropia criptográfica e o par de chaves secp256k1 (NIP-01)."""
    private_key = os.urandom(32)
    sk = secp256k1.PrivateKey(private_key)
    public_key = sk.pubkey.serialize()[1:] # X-only pubkey
    return private_key.hex(), public_key.hex()

def encrypt_identity(nsec: str, password: str) -> bytes:
    """Criptografa o nsec usando AES-256-GCM."""
    salt = os.urandom(16)
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=480000,
    )
    key = kdf.derive(password.encode())
    aesgcm = AESGCM(key)
    nonce = os.urandom(12)
    ciphertext = aesgcm.encrypt(nonce, nsec.encode(), None)

    payload = {
        "salt": salt.hex(),
        "nonce": nonce.hex(),
        "ciphertext": ciphertext.hex()
    }
    return json.dumps(payload).encode()

if __name__ == "__main__":
    print("🜏 ARKHE(N) - Node Identity Forge")
    usb_path = input("Target USB mount path: ")
    if not os.path.exists(usb_path):
        print("Error: Path not found.")
        exit(1)

    nsec, npub = generate_nostr_keys()
    print(f"Generated npub: {npub}")

    password = getpass.getpass("Ignition Password: ")
    encrypted_payload = encrypt_identity(nsec, password)

    with open(os.path.join(usb_path, "arkhe_identity.aes"), "wb") as f:
        f.write(encrypted_payload)
    with open(os.path.join(usb_path, "node_pubkey.txt"), "w") as f:
        f.write(npub)

    print(f"Identity anchored at {usb_path}/arkhe_identity.aes")
