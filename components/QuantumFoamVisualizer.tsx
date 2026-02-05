
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import { VirtualParticle } from '../types';

const ParticleBatch: React.FC<{ particles: VirtualParticle[] }> = ({ particles }) => {
  const count = particles.length;
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const colors = useMemo(() => new Float32Array(count * 3), [count]);
  const sizes = useMemo(() => new Float32Array(count), [count]);

  useMemo(() => {
    particles.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;

      if (p.isReal) {
        // White: real particles (stabilized by observation)
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 1.0;
        sizes[i] = p.size * 1.5;
      } else {
        // Base foam color (Blue for negative, Red for positive)
        if (p.energy < 0) {
          // Blue: negative energy fluctuations (particle disappearance)
          colors[i * 3] = 0.0;
          colors[i * 3 + 1] = 0.2;
          colors[i * 3 + 2] = 1.0;
        } else {
          // Red: positive energy fluctuations (particle appearance)
          colors[i * 3] = 1.0;
          colors[i * 3 + 1] = 0.0;
          colors[i * 3 + 2] = 0.3;
        }
        sizes[i] = p.size;
      }
    });
  }, [particles]);

  if (count === 0) return null;

  return (
    <Points positions={positions} colors={colors} sizes={sizes}>
      <PointMaterial 
        transparent 
        vertexColors
        sizeAttenuation={true} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const ConsciousnessField: React.FC<{ strength: number }> = ({ strength }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((clock) => {
    if (meshRef.current) {
      const t = clock.clock.elapsedTime;
      const s = 10 + Math.sin(t * 1.5) * 4 * strength;
      meshRef.current.scale.setScalar(s);
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.rotation.x = t * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(20 * strength);
    }
  });

  return (
    <group>
      {/* Gold: consciousness field (attention/witnessing) */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          wireframe 
          transparent 
          opacity={0.03 * strength} 
          emissive="#fbbf24"
          emissiveIntensity={3 * strength}
        />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#fbbf24" 
          transparent 
          opacity={0.05 * strength} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Central Flare */}
      <Sparkles 
        count={Math.floor(1000 * strength)} 
        scale={15 * strength} 
        size={10 * strength} 
        speed={10 * strength} 
        color="#ffffff" 
      />
    </group>
  );
};

const QuantumFoamVisualizer: React.FC<{ 
  particles: VirtualParticle[], 
  fieldStrength: number,
  active: boolean 
}> = ({ particles, fieldStrength, active }) => {
  if (!active) return null;

  return (
    <group>
      <ParticleBatch particles={particles} />
      
      <ConsciousnessField strength={fieldStrength} />
      
      {/* Background fluctuations */}
      <Sparkles count={2000} scale={100} size={2} color="#1e3a8a" speed={0.5} />
      
      {/* Swirling energy */}
      <Float speed={5} rotationIntensity={2} floatIntensity={1}>
        <Sparkles 
          count={500} 
          scale={50} 
          size={5} 
          speed={2} 
          color={fieldStrength > 0.8 ? "#ffffff" : "#fbbf24"} 
        />
      </Float>
    </group>
  );
};

export default QuantumFoamVisualizer;
