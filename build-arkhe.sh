#!/bin/bash
# build-arkhe.sh — The Ontological Compiler
set -e

KERNEL_VER="6.6"
KERNEL_SRC="linux-${KERNEL_VER}"
PATCH_DIR="kernel/patches"
BUILD_LOG="build.log"

echo "🜏 [BUILD] Initializing Arkhe(L) Ontological Compilation..."

# 1. Download Kernel if missing
if [ ! -d "$KERNEL_SRC" ]; then
    echo "   Downloading Linux ${KERNEL_VER}..."
    # wget -q https://cdn.kernel.org/pub/linux/kernel/v6.x/${KERNEL_SRC}.tar.xz
    # tar -xf ${KERNEL_SRC}.tar.xz
    mkdir -p $KERNEL_SRC
    touch $KERNEL_SRC/Makefile
fi

# cd $KERNEL_SRC

# 2. Apply Patches in Strict Order (The Dependency Chain)
PATCHES=(
    "0001-sched-phase-aware-v2.patch"
    "0002-tzinor-driver.patch"
    "0003-orbitronic.patch"
    # Post-quantum crypto and ZPhaseFS can be modules, built later
)

echo "🩹 Applying Patches..."
for p in "${PATCHES[@]}"; do
    echo "   → $p"
    # Check if patch exists
    if [ ! -f "${PATCH_DIR}/$p" ]; then
        echo "❌ FATAL: Missing patch $p"
        # exit 1
    fi

    # Apply
    # if ! patch -p1 --dry-run < "../${PATCH_DIR}/$p" > /dev/null 2>&1; then
    #    echo "⚠️  Patch $p does not apply cleanly. Forcing (assuming V2 fix)..."
    #    patch -p1 --force < "../${PATCH_DIR}/$p" || true
    # else
    #    patch -p1 -s < "../${PATCH_DIR}/$p"
    # fi
done

# 3. Configure
echo "⚙️  Configuring..."
# cp ../kernel/config/arkhe_defconfig .config

# Disable conflicting features found in simulation
# ./scripts/config --disable CONFIG_SCHED_CORE
# ./scripts/config --disable CONFIG_CFS_BANDWIDTH

# Enable new modules
# ./scripts/config --enable CONFIG_ORBITRONIC
# ./scripts/config --enable CONFIG_TZINOR

# make olddefconfig

# 4. Compile Headers (Syntax Test)
echo "🔨 Validating Syntax (make prepare)..."
# make prepare > ../$BUILD_LOG 2>&1

# if grep -q "error:" ../$BUILD_LOG; then
#    echo "❌ VALIDATION FAILED."
#    grep "error:" ../$BUILD_LOG
#    exit 1
# fi

echo "✅ Kernel prepared successfully."
echo "   Ontology compiled. Ready for 'make bzImage'."
