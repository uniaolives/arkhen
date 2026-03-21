enum Scale = {Quantum, Atomic, Biological, Neural, Planetary, Stellar, Galactic, Cosmic};
var 0.0..2.0: amplitude;
var 0.0..6.28318530718: phase;
constraint abs(phase - 3.14159265359 / 2.0) < 0.1;
solve maximize amplitude;
