#!/usr/bin/env bash
# scripts/arkhe-inject.sh

DEVICE=$1
MOUNT_POINT="/mnt/arkhe_temp_usb"
KEY_FILE="${MOUNT_POINT}/arkhe_identity.aes"
ENV_FILE="/dev/shm/arkhe_node.env"

echo "🜏 [IGNITION] Identity token detected at /dev/${DEVICE}"

mkdir -p ${MOUNT_POINT}
mount -o ro /dev/${DEVICE} ${MOUNT_POINT}

if [ ! -f "${KEY_FILE}" ]; then
    echo "⚠️ [ERROR] arkhe_identity.aes not found."
    umount ${MOUNT_POINT}
    exit 1
fi

# Request password on tty
exec < /dev/tty1
echo -n "Enter Ignition Password: " > /dev/tty1
read -s PASSWORD
echo "" > /dev/tty1

# Decrypt using python cryptography - Passing password via stdin to avoid command injection and ps exposure
NSEC=$(echo -n "$PASSWORD" | python3 -c "
import sys, json
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

# Read password from stdin
password = sys.stdin.read().encode()

with open('${KEY_FILE}', 'r') as f:
    data = json.load(f)

kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=bytes.fromhex(data['salt']), iterations=480000)
key = kdf.derive(password)
aesgcm = AESGCM(key)
try:
    nsec = aesgcm.decrypt(bytes.fromhex(data['nonce']), bytes.fromhex(data['ciphertext']), None)
    print(nsec.decode())
except Exception:
    print('ERROR')
")

if [ "$NSEC" == "ERROR" ]; then
    echo "⚠️ [ERROR] Collapse failed. Incorrect password."
    umount ${MOUNT_POINT}
    exit 1
fi

# Inject into volatile memory
echo "export NOSTR_PRIVATE_KEY=${NSEC}" > ${ENV_FILE}
chmod 400 ${ENV_FILE}

umount ${MOUNT_POINT}
echo "🔐 [SECURE] Identity transferred to Z-Domain (RAM). Triggering services..."

# Signal systemd to start the ignition service
systemctl start arkhe-ignition.service
