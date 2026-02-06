FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
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
COPY tim_vm/tim_vm.c .

# Compile C component
RUN gcc -O3 -o /usr/local/bin/tim_vm tim_vm.c -lpthread

# Expose ports
EXPOSE 8000 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run application
CMD ["uvicorn", "app.webhooks.github:app", "--host", "0.0.0.0", "--port", "8000"]
