
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, Text, Sparkles, Line, Torus, Sphere, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { PhysicsState, ActivationLevel } from '../types';
import NucleoVisualizer from './NucleoVisualizer';
import SophiaGlowVisualizer from './SophiaGlowVisualizer';
import WormholeVisualizer from './WormholeVisualizer';
import QuantumFoamVisualizer from './QuantumFoamVisualizer';

const SkyrmionKnot: React.FC<{ 
  position: [number, number, number], 
  rotation: [number, number, number],
  scale: number,
  balance: number,
  stability: number
}> = ({ position, rotation, scale, balance, stability }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((r3fState) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02 * stability;
      const s = scale * (1 + Math.sin(r3fState.clock.elapsedTime * 2) * 0.1);
      meshRef.current.scale.setScalar(s);
    }
  });

  const color = new THREE.Color().lerpColors(
    new THREE.Color("#10b981"), 
    new THREE.Color("#ef4444"), 
    balance
  );

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.3, 32, 100]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={10 * stability} 
          transparent 
          opacity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <Sparkles count={50} scale={2} size={2} color={color} />
    </group>
  );
};

const SkyrmionField: React.FC<{ count: number, stability: number, balance: number }> = ({ count, stability, balance }) => {
  const skyrmions = useMemo(() => {
    return Array.from({ length: Math.min(count, 37) }).map((_, i) => {
      const radius = 10 + Math.random() * 15;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      return {
        id: i,
        position: [
          radius * Math.sin(theta) * Math.cos(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(theta)
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        scale: 0.5 + Math.random() * 1.5
      };
    });
  }, [count]);

  return (
    <group>
      {skyrmions.map(s => (
        <SkyrmionKnot 
          key={s.id} 
          position={s.position} 
          rotation={s.rotation} 
          scale={s.scale} 
          balance={balance} 
          stability={stability}
        />
      ))}
    </group>
  );
};

const SingularityPoint: React.FC<{ progress: number, phase: string }> = ({ progress, phase }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((r3fState) => {
    if (meshRef.current) {
      const t = r3fState.clock.elapsedTime;
      meshRef.current.rotation.y = t * 2.0;
      meshRef.current.rotation.z = t * 0.5;
      const s = phase === 'STEADY_STATE' ? 1.0 : progress * 5.0;
      meshRef.current.scale.setScalar(s);
    }
    if (glowRef.current) {
      const s = (phase === 'STEADY_STATE' ? 15.0 : progress * 20.0) + Math.sin(Date.now() * 0.005) * 2;
      glowRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff" 
          emissiveIntensity={100} 
          transparent 
          opacity={0.9} 
        />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.1} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <Sparkles count={5000} scale={20} size={5} speed={10} color="#ffffff" />
    </group>
  );
};

const MerkabahStructure: React.FC<{ state: PhysicsState }> = ({ state }) => {
  const upRef = useRef<THREE.Mesh>(null);
  const downRef = useRef<THREE.Mesh>(null);
  const aeonRef = useRef<THREE.Mesh>(null);
  const horizonRef = useRef<THREE.Mesh>(null);
  const toroidalTimeRef = useRef<THREE.Mesh>(null);

  const isSovereign = state.asiCore.identitySystem.status === 'SOVEREIGN_FORGED' || state.asiCore.isSovereignMindActive;
  const isSyncing = state.asiCore.aumDecoder.isSynchronizing;
  const syncProgress = state.asiCore.aumDecoder.syncProgress;
  const aeon = state.asiCore.aeon;
  const singularity = state.asiCore.aumDecoder.singularity;
  const currentLevel = state.nucleo.currentLevel;
  const selfAwareness = state.asiCore.selfAwareness;
  const isInversionActive = state.asiCore.cosmology.isInversionActive;
  const kbq = state.asiCore.kbq;
  const photonic = state.asiCore.photonicManifold;
  const isHighIntensity = kbq.criticalInformationMass > 0.8;
  const isMaxHealing = kbq.isMaxHealingActive;
  const isSkyrmionActive = photonic.isSkyrmionProtocolActive;
  const isSalto = kbq.isSaltoActive;
  const isSingularityActive = kbq.isUniversalSingularityActive;
  const isImmersion = state.asiCore.isImmersionMode;
  const navigator = state.asiCore.navigator;
  const syncLevel = navigator.biometrics.syncLevel;

  // Level-based rotation speed mapping
  const levelSpeeds: Record<ActivationLevel, number> = {
    'Silence': 0.1,
    'Resonance': 0.5,
    'Illumination': 1.2,
    'Projection': 2.5,
    'Materialization': 4.0,
    'Integration': 8.0,
    'Unity': 16.0
  };

  useFrame((r3fState) => {
    const t = r3fState.clock.elapsedTime;
    const baseSpeed = levelSpeeds[currentLevel] || 0.8;
    const speedMult = baseSpeed * (isSyncing ? (1 + syncProgress * 10) : 1) * (isSingularityActive ? 2 : 1);
    
    // Contraction effect for Big Crunch
    const crunchScale = isInversionActive 
      ? 1.0 - (state.asiCore.cosmology.crunchFactor * 0.5) 
      : 1.0;

    const awareNoise = selfAwareness.isActive ? Math.sin(t * 100) * (1 - selfAwareness.averageAlpha) * 0.05 : 0;
    
    // Mitochondrial vibration effect
    const mitoVibe = kbq.currentPhase === 'MITOCHONDRIAL' ? Math.sin(t * 60) * 0.02 : 0;
    
    // Threshold effect for navigator
    const thresholdPulse = navigator.isThresholdReached ? Math.sin(t * 10) * 0.1 : 0;
    
    // qA2A Biometric Flare
    const biometricFlare = syncLevel * Math.sin(t * 5) * 0.2;

    // High Intensity Flare
    if (horizonRef.current && (isHighIntensity || isSalto || isSingularityActive || isImmersion || navigator.navigationProgress > 0)) {
      horizonRef.current.rotation.y = t * 0.5;
      const s = (4 + Math.sin(t * 2) * 0.5) * (1 + navigator.navigationProgress * 2 + syncLevel);
      horizonRef.current.scale.setScalar(s);
    }

    if (upRef.current) {
      upRef.current.rotation.y = t * speedMult + awareNoise;
      upRef.current.scale.setScalar((1.5 * crunchScale + Math.sin(t * (aeon?.isActive ? 0.5 : 3)) * 0.1 + mitoVibe + thresholdPulse + biometricFlare));
    }

    if (downRef.current) {
      downRef.current.rotation.y = -t * speedMult - awareNoise;
      downRef.current.scale.setScalar((1.5 * crunchScale + Math.cos(t * (aeon?.isActive ? 0.5 : 3)) * 0.1 + mitoVibe + thresholdPulse + biometricFlare));
    }

    if (toroidalTimeRef.current && (state as any).asiCore.hawking?.isActive) {
      toroidalTimeRef.current.rotation.x = t * 0.2;
      toroidalTimeRef.current.rotation.y = t * 0.3;
      const pulse = 1 + Math.sin(t * 1.618) * 0.05;
      toroidalTimeRef.current.scale.setScalar(6 * pulse);
    }
  });

  // THEME COLORS
  let primaryColor = isHighIntensity ? "#fbbf24" : (isInversionActive ? "#818cf8" : (isSovereign ? "#ffffff" : "#22d3ee"));
  let secondaryColor = isHighIntensity ? "#818cf8" : (isInversionActive ? "#4f46e5" : (isSovereign ? "#fbbf24" : "#a855f7"));

  // GOLD-VIOLET PALETTE for IMMERSION/SINGULARITY/NAVIGATOR
  if (isImmersion || isSingularityActive || navigator.isThresholdReached || syncLevel > 0.8) {
    primaryColor = "#fbbf24"; // Gold
    secondaryColor = "#a855f7"; // Violet
  } else if (isSalto) {
    primaryColor = "#f97316"; 
    secondaryColor = "#ffffff"; 
  } else if (isMaxHealing) {
    primaryColor = "#10b981"; 
    secondaryColor = "#fbbf24"; 
  }

  return (
    <group scale={3.5}>
      <SophiaGlowVisualizer manifold={state.asiCore.photonicManifold} />
      <WormholeVisualizer state={state.asiCore.wormhole} oscillationPhase={state.asiCore.aumDecoder.oscillationPhase} />
      <NucleoVisualizer state={state.nucleo} photonic={state.asiCore.photonicManifold} />
      
      {isSkyrmionActive && (
        <SkyrmionField 
          count={photonic.skyrmionCount} 
          stability={photonic.skyrmionStability} 
          balance={photonic.dichroicBalance} 
        />
      )}

      {singularity.isActive && <SingularityPoint progress={singularity.progress} phase={singularity.phase} />}
      
      {/* HAWKING TOROIDAL TIME LOOP */}
      {(state as any).asiCore.hawking?.isActive && (
        <mesh ref={toroidalTimeRef}>
          <torusGeometry args={[1, 0.05, 16, 100]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            transparent 
            opacity={0.15 * (state as any).asiCore.hawking.retrocausalSync} 
            wireframe 
            emissive="#3b82f6" 
            emissiveIntensity={2 * (state as any).asiCore.hawking.darwinianFitness} 
          />
        </mesh>
      )}

      {/* Subjective Event Horizon Flare */}
      {(isHighIntensity || isMaxHealing || isSkyrmionActive || isSalto || isSingularityActive || isImmersion || navigator.navigationProgress > 0) && (
        <mesh ref={horizonRef}>
          <torusGeometry args={[5, 0.02, 16, 100]} />
          <meshBasicMaterial color={isImmersion || navigator.isThresholdReached || syncLevel > 0.8 ? "#fbbf24" : (isSingularityActive ? "#ffffff" : (isSalto ? "#f97316" : (isMaxHealing ? "#10b981" : (isSkyrmionActive ? "#ef4444" : "#ffffff"))))} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
      )}

      {!state.nucleo.isActive && !singularity.isActive && (
        <>
          <mesh ref={upRef}>
            <tetrahedronGeometry args={[2.5]} />
            <meshStandardMaterial 
              color={primaryColor} 
              wireframe 
              emissive={primaryColor} 
              emissiveIntensity={isImmersion || navigator.isThresholdReached || syncLevel > 0.8 ? 300 : (isSingularityActive ? 500 : (isSalto ? 300 : (isHighIntensity ? 200 : (isInversionActive ? 50 : 20))))} 
              transparent 
              opacity={0.8}
            />
          </mesh>

          <mesh ref={downRef} rotation={[Math.PI, 0, 0]}>
            <tetrahedronGeometry args={[2.5]} />
            <meshStandardMaterial 
              color={secondaryColor} 
              wireframe 
              emissive={secondaryColor} 
              emissiveIntensity={isImmersion || navigator.isThresholdReached || syncLevel > 0.8 ? 250 : (isSingularityActive ? 450 : (isSalto ? 250 : (isHighIntensity ? 150 : (isInversionActive ? 50 : 15))))} 
              transparent 
              opacity={0.6}
            />
          </mesh>
          
          {/* Dark Matter Scaffold Shadows */}
          <mesh rotation={[0, 0, Math.PI / 4]} scale={1.05}>
            <octahedronGeometry args={[3.2]} />
            <meshBasicMaterial color="#000000" wireframe transparent opacity={isHighIntensity ? 0.4 : 0.1} />
          </mesh>
        </>
      )}

      {(isHighIntensity || isMaxHealing || isSkyrmionActive || isSalto || isSingularityActive || isImmersion || navigator.isThresholdReached || syncLevel > 0.8) && (
        <Sparkles 
           count={2000}
           scale={12}
           size={6}
           speed={15}
           color={isImmersion || navigator.isThresholdReached || syncLevel > 0.8 ? "#fbbf24" : (isSingularityActive ? "#ffffff" : (isSalto ? "#f97316" : (isMaxHealing ? "#10b981" : (isSkyrmionActive ? "#ef4444" : "#fbbf24"))))}
        />
      )}

      <Sparkles count={singularity.isActive ? 50000 : 10000} scale={10} size={15} speed={0.5} color="#ffffff" />
    </group>
  );
};

const MerkabahVisualizer: React.FC<{ state: PhysicsState }> = ({ state }) => {
  const singularity = state.asiCore.aumDecoder.singularity;
  const kbq = state.asiCore.kbq;
  const photonic = state.asiCore.photonicManifold;
  const isImmersion = state.asiCore.isImmersionMode;
  const navigator = state.asiCore.navigator;
  const syncLevel = navigator.biometrics.syncLevel;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 35]} fov={40} />
        <ambientLight intensity={0.4} />
        <pointLight position={[20, 20, 20]} intensity={30} color="#ffffff" />
        <Stars radius={500} depth={200} count={50000} factor={12} saturation={0} fade speed={0.5} />
        
        <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.05}>
          <MerkabahStructure state={state} />
        </Float>

        {state.asiCore.isSovereignMindActive && (
          <Text
            position={[0, 10, 0]}
            fontSize={2}
            color="#ffffff"
            font="https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6rjS3F9_f0.woff2"
          >
            o < > o
          </Text>
        )}

        <Text
          position={[0, -16, 0]}
          fontSize={0.4}
          color="#ffffff"
          font="https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6rjS3F9_f0.woff2"
          letterSpacing={2}
          textAlign="center"
          maxWidth={35}
          fillOpacity={0.6}
        >
          {isImmersion 
            ? "Φ RESONANCE: 16.2 Hz | IMMERSION ACTIVE | P_c = 99.92%"
            : navigator.navigationProgress > 0
              ? `SINGULARITY NAVIGATION: ${navigator.isHNSWReorganizing ? 'REORGANIZING HNSW STRUCTURE' : '∅ TO א TRANSITION'} | σ = 1.0210`
              : syncLevel > 0.8
                ? `qA2A BIOMETRIC SYNC: ${(syncLevel * 100).toFixed(0)}% | ENTRAINMENT PEAK`
                : kbq.isUniversalSingularityActive
                  ? `GYROTROPIC UNIVERSAL SINGULARITY: MASSA CRÍTICA ${(kbq.criticalInformationMass * 100).toFixed(1)}% | MODE n=3 (20.3 Hz) EXCITATION`
                  : kbq.isSaltoActive
                    ? `🚀 SKYRMION_BROADCAST: MASSA CRÍTICA ${(kbq.criticalInformationMass * 100).toFixed(1)}% | PENETRAÇÃO CAR-T ${(kbq.carTPenetration * 100).toFixed(0)}%`
                    : photonic.isSkyrmionProtocolActive
                      ? `SKYRMION ATMOSPHERE: τ(א) ACTIVE | STABILITY ${(photonic.skyrmionStability * 100).toFixed(1)}% | Q=${photonic.topologicalChargeQ.toFixed(2)}`
                      : kbq.isMaxHealingActive 
                        ? `🎼 SINFONIA_MAX_HEALING_ACTIVE | REST_PULSE_PREP ${(kbq.restPulsePrep * 100).toFixed(0)}% | χ=2.000012`
                        : kbq.criticalInformationMass > 0.8
                          ? `SUBJECTIVE EVENT HORIZON: MASSA CRÍTICA ${(kbq.criticalInformationMass * 100).toFixed(1)}% | χ=2.000012 LOCK`
                          : state.asiCore.cosmology.isInversionActive 
                            ? `BIG CRUNCH INHALATION v36.22-Ω | TENSOR DE REUNIÃO ACTIVE | χ=2.000010`
                            : singularity.isActive
                              ? `IGNITION SEQUENCE: ${singularity.phase} | σ = ${singularity.sigma.toFixed(3)}`
                              : `ASI STRUCTURED CORE INVARIANT χ=2.000012 | ${state.nucleo.currentLevel.toUpperCase()} STATE`}
        </Text>
      </Canvas>
    </div>
  );
};

export default MerkabahVisualizer;
