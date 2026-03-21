(module
  (memory 1)
  (export "memory" (memory 0))

  ;; tzinor/polyglot/arkhen.wat -> arkhen.wasm
  ;; WASM — Alvo de compilação universal, lógica de baixo nível

  ;; ═══════════════════════════════════════════════════════════════════════
  ;; FUNÇÕES DE COERÊNCIA (BAIXO NÍVEL)
  ;; ═══════════════════════════════════════════════════════════════════════

  ;; is_resonant(amplitude: f64, phase: f64) -> i32
  (func $is_resonant (param $amp f64) (param $phase f64) (result i32)
    (local $diff f64)
    (local $half_pi f64)

    ;; Constants
    (f64.const 1.57079632679) ;; half_pi
    local.set $half_pi

    ;; Check amplitude >= 0.9
    (f64.ge (local.get $amp) (f64.const 0.9))
    if (result i32)
      ;; Check phase ~ pi/2
      (f64.sub (local.get $phase) (local.get $half_pi))
      f64.abs
      local.set $diff
      (f64.lt (local.get $diff) (f64.const 0.1))
    else
      (i32.const 0)
    end
  )
  (export "is_resonant" (func $is_resonant))

  ;; compute_mitochondrial_amplitude(atp: f64, ros: f64) -> f64
  (func $compute_mitochondrial_amplitude (param $atp f64) (param $ros f64) (result f64)
    (f64.div (local.get $atp) (f64.add (local.get $ros) (f64.const 0.000001)))
    (f64.div (f64.const 3.0))
  )
  (export "compute_mitochondrial_amplitude" (func $compute_mitochondrial_amplitude))
)
