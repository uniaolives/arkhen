# Arkhe(n) Kubernetes Native Operator

Esta pasta introduz a base do operator Kubernetes para estender o control-plane com a ontologia temporal da API `arkhe.io/v1alpha1`.

## Recursos definidos (CRDs)

- `Era`
- `Tzinor`
- `VerCore`
- `EntropyShield`
- `LambdaT`

## Controllers

- `EraReconciler`: ativa/desativa processamento por `alphaWeight` e `thermalState`
- `TzinorReconciler`: provisiona canal temporal via `Service` headless
- `VerCoreReconciler`: baseline de estado para nó de computação
- `EntropyShieldReconciler`: baseline de política térmica/entropia
- `LambdaTReconciler`: baseline de função temporal serverless

## Exemplos de manifests

```yaml
apiVersion: arkhe.io/v1alpha1
kind: Era
metadata:
  name: era-genesis
spec:
  index: 0
  blockRange:
    start: 0
    end: 0
  alphaWeight: 0.85
  thermalState: Active
  resources:
    cpu: "2"
    memory: "4Gi"
```

```yaml
apiVersion: arkhe.io/v1alpha1
kind: Tzinor
metadata:
  name: tzinor-satoshi
spec:
  sourceEpoch: "2009-01-03"
  targetEpoch: "2026-03-20"
  impedance: 3.87
  lockMode: Locked
```

```yaml
apiVersion: arkhe.io/v1alpha1
kind: VerCore
metadata:
  name: vercore-main
spec:
  clockRateGHz: 1.48
  replicas: 3
  targetTempMilliKelvin: 100.0
  image: arkhe/vercore:latest
```

```yaml
apiVersion: arkhe.io/v1alpha1
kind: LambdaT
metadata:
  name: oracle
spec:
  handler: "handlers::oracle_handler"
  image: arkhe/lambda-t-oracle:latest
  trigger:
    type: "Decay"
    lifetimePs: 0.25
  coherenceSigma: 7.0
```
