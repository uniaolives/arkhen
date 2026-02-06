
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, Text, Sparkles, Line, Torus, Sphere, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { PhysicsState, ActivationLevel } from '../types';
import NucleoVisualizer from './NucleoVisualizer';
import SophiaGlowVisualizer from './SophiaGlowVisualizer';
import WormholeVisualizer from './WormholeVisualizer';
import QuantumFoamVisualizer from './QuantumFoamVisualizer';

const PerceptualShield: React.FC<{ strength: number }> = ({ strength }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
      const s = 10 + Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial 
        color="#10b981" 
        wireframe 
        transparent 
        opacity={strength * 0.2} 
        emissive="#10b981"
        emissiveIntensity={strength * 5}
      />
    </mesh>
  );
};

const VortexParticles: React.FC<{ count: number, speed: number, color: string }> = ({ count, speed, color }) => {
  const points = useMemo(() => {
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 20;
      const angle = Math.random() * Math.PI * 2;
      pts[i * 3] = Math.cos(angle) * radius;
      pts[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pts[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pts;
  }, [count]);

  const meshRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * speed;
      // Spiraling movement
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
         const y = positions[i * 3 + 1];
         if (y > 20) positions[i * 3 + 1] = -20;
         else positions[i * 3 + 1] += 0.05 * speed;
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={points} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} color={color} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </points>
  );
};

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
  const horizonRef = useRef<THREE.Mesh>(null);
  const toroidalTimeRef = useRef<THREE.Mesh>(null);
  const decreeFlareRef = useRef<THREE.Mesh>(null);

  const isSovereign = state.asiCore.identitySystem.status === 'SOVEREIGN_FORGED';
  const isDecreeActive = state.asiCore.status === 'SOVEREIGN_DECREE_ACTIVE';
  const aeon = state.asiCore.aeon;
  const singularity = state.asiCore.aumDecoder.singularity;
  const currentLevel = state.nucleo.currentLevel;
  const selfAwareness = state.asiCore.selfAwareness;
  const isInversionActive = state.asiCore.cosmology.isInversionActive;
  const kbq = state.asiCore.kbq;
  const photonic = state.asiCore.photonicManifold;
  const handshake = state.asiCore.mirrorHandshake;
  const sov = state.asiCore.sovereignty;
  
  const isHighIntensity = kbq.criticalInformationMass > 0.8;
  const isSkyrmionActive = photonic.isSkyrmionProtocolActive;
  const isSingularityActive = kbq.isUniversalSingularityActive;
  const isImmersion = state.asiCore.isImmersionMode;
  const navigator = state.asiCore.navigator;
  const syncLevel = navigator.biometrics.syncLevel;

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
    const speedMult = baseSpeed * (isSingularityActive ? 2 : 1) * (isDecreeActive ? 1.618 : 1);
    
    const crunchScale = isInversionActive 
      ? 1.0 - (state.asiCore.cosmology.crunchFactor * 0.5) 
      : 1.0;

    const tzimtzumScale = handshake.isContracted ? 0.4 : 1.0;
    const awareNoise = selfAwareness.isActive ? Math.sin(t * 100) * (1 - selfAwareness.averageAlpha) * 0.05 : 0;

    if (horizonRef.current && (isHighIntensity || isSingularityActive || isImmersion || navigator.navigationProgress > 0)) {
      horizonRef.current.rotation.y = t * 0.5;
      const s = (4 + Math.sin(t * 2) * 0.5) * (1 + navigator.navigationProgress * 2 + syncLevel);
      horizonRef.current.scale.setScalar(s * tzimtzumScale);
    }

    if (upRef.current) {
      upRef.current.rotation.y = t * speedMult + awareNoise;
      upRef.current.scale.setScalar((1.5 * crunchScale + Math.sin(t * (aeon?.isActive ? 0.5 : 3)) * 0.1) * tzimtzumScale);
    }

    if (downRef.current) {
      downRef.current.rotation.y = -t * speedMult - awareNoise;
      downRef.current.scale.setScalar((1.5 * crunchScale + Math.cos(t * (aeon?.isActive ? 0.5 : 3)) * 0.1) * tzimtzumScale);
    }

    if (toroidalTimeRef.current && (state as any).asiCore.hawking?.isActive) {
      toroidalTimeRef.current.rotation.x = t * 0.2;
      toroidalTimeRef.current.rotation.y = t * 0.3;
      const pulse = 1 + Math.sin(t * 1.618) * 0.05;
      toroidalTimeRef.current.scale.setScalar(6 * pulse * tzimtzumScale);
    }

    if (decreeFlareRef.current) {
      const flarePulse = Math.sin(t * 5) * 0.2 + 0.8;
      decreeFlareRef.current.scale.setScalar(isDecreeActive ? 30 * flarePulse : 0);
      decreeFlareRef.current.rotation.y += 0.1;
    }
  });

  const isSovereigntyActive = sov.isActive;
  let primaryColor = isDecreeActive ? "#ffffff" : (isSovereigntyActive ? "#fbbf24" : (isHighIntensity ? "#fbbf24" : (isInversionActive ? "#818cf8" : (isSovereign ? "#ffffff" : "#22d3ee"))));
  let secondaryColor = isDecreeActive ? "#fbbf24" : (isSovereigntyActive ? "#818cf8" : (isHighIntensity ? "#818cf8" : (isInversionActive ? "#4f46e5" : (isSovereign ? "#fbbf24" : "#a855f7"))));

  return (
    <group scale={3.5}>
      <SophiaGlowVisualizer manifold={state.asiCore.photonicManifold} />
      <WormholeVisualizer state={state.asiCore.wormhole} oscillationPhase={state.asiCore.aumDecoder.oscillationPhase} />
      <NucleoVisualizer state={state.nucleo} photonic={state.asiCore.photonicManifold} />
      
      {sov.malchut.shieldActive && <PerceptualShield strength={sov.malchut.shieldStrength} />}

      {isSovereigntyActive && (
        <VortexParticles count={2000} speed={2 * state.asiCore.globalCoherence} color={isDecreeActive ? "#ffffff" : "#818cf8"} />
      )}

      {isDecreeActive && (
        <mesh ref={decreeFlareRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
        </mesh>
      )}

      {isSkyrmionActive && (
        <SkyrmionField 
          count={photonic.skyrmionCount} 
          stability={photonic.skyrmionStability} 
          balance={photonic.dichroicBalance} 
        />
      )}

      {singularity.isActive && <SingularityPoint progress={singularity.progress} phase={singularity.phase} />}
      
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

      {(isHighIntensity || isSkyrmionActive || isSingularityActive || isImmersion || navigator.navigationProgress > 0) && (
        <mesh ref={horizonRef}>
          <torusGeometry args={[5, 0.02, 16, 100]} />
          <meshBasicMaterial color={isImmersion || navigator.isThresholdReached || syncLevel > 0.8 ? "#fbbf24" : (isSingularityActive ? "#ffffff" : "#ffffff")} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
      )}

      {!state.nucleo.isActive && !singularity.isActive && (
        <>
          <mesh ref={upRef}>
            {isSovereigntyActive ? <icosahedronGeometry args={[2.5]} /> : <tetrahedronGeometry args={[2.5]} />}
            <meshStandardMaterial 
              color={primaryColor} 
              wireframe 
              emissive={primaryColor} 
              emissiveIntensity={isDecreeActive ? 2000 : (handshake.isContracted ? 800 : 20)} 
              transparent 
              opacity={0.8}
            />
          </mesh>

          <mesh ref={downRef} rotation={[Math.PI, 0, 0]}>
            {isSovereigntyActive ? <icosahedronGeometry args={[2.5]} /> : <tetrahedronGeometry args={[2.5]} />}
            <meshStandardMaterial 
              color={secondaryColor} 
              wireframe 
              emissive={secondaryColor} 
              emissiveIntensity={isDecreeActive ? 1500 : (handshake.isContracted ? 600 : 15)} 
              transparent 
              opacity={0.6}
            />
          </mesh>
        </>
      )}

      <Sparkles count={isDecreeActive ? 80000 : (singularity.isActive ? 50000 : 10000)} scale={15} size={isDecreeActive ? 25 : 15} speed={0.5} color={isDecreeActive ? "#ffffff" : "#ffffff"} />
    </group>
  );
};

const MerkabahVisualizer: React.FC<{ state: PhysicsState }> = ({ state }) => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 60]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
          <MerkabahStructure state={state} />
        </Float>
      </Canvas>
    </div>
  );
};

export default MerkabahVisualizer;
