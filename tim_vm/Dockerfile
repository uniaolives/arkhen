FROM python:3.10-slim

WORKDIR /app

# Install system dependencies including GCC for tim_vm
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    make \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt || true

# Copy application
COPY app/ ./app/
COPY tim_vm/src/ ./tim_vm/src/
RUN mkdir -p tim_vm/bin

# Compile tim_vm with optimizations
RUN gcc -O3 -march=native -o /usr/local/bin/tim_vm tim_vm/src/tim_vm.c -lm

# Copy scripts
COPY scripts/ ./scripts/
RUN chmod +x scripts/*.py scripts/*.sh

# Copy configuration
COPY app/configs/ ./app/configs/

# Expose ports
EXPOSE 8000 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run application
CMD ["uvicorn", "app.webhooks.github:app", "--host", "0.0.0.0", "--port", "8000"]
