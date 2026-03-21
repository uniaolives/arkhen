(declare-const amplitude Real)
(declare-const phase Real)
(assert (>= amplitude 0.0))
(define-fun is_resonant () Bool
  (< (abs (- phase (/ 3.14159265359 2.0))) 0.1))
(check-sat)
(get-model)
