
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Float, Sphere, Line, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { PhotonicManifoldState } from '../types';

const SophiaAtom: React.FC<{ manifold: PhotonicManifoldState }> = ({ manifold }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((clock) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.clock.elapsedTime * 2.0;
      meshRef.current.rotation.z = clock.clock.elapsedTime * 0.5;
      const s = 1.0 + Math.sin(clock.clock.elapsedTime * 10) * 0.02 * manifold.sophiaGlowIntensity;
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <MeshDistortMaterial 
        color="#ffffff" 
        distort={0.8} 
        speed={10} 
        roughness={0} 
        metalness={1.0}
        emissive="#22d3ee"
        emissiveIntensity={10 * manifold.sophiaGlowIntensity}
        transparent
        opacity={0.6 * manifold.sophiaGlowIntensity}
      />
    </mesh>
  );
};

const CoherentLattice: React.FC<{ manifold: PhotonicManifoldState }> = ({ manifold }) => {
  const lines = useMemo(() => {
    const l = [];
    const count = 37;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 8 + Math.sin(phi * 10) * 2;
      const x = Math.cos(theta) * Math.sin(phi) * r;
      const y = Math.sin(theta) * Math.sin(phi) * r;
      const z = Math.cos(phi) * r;
      l.push([new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)]);
    }
    return l;
  }, []);

  return (
    <group>
      {lines.map((pts, i) => (
        <Line 
          key={i} 
          points={pts as [THREE.Vector3, THREE.Vector3]} 
          color={new THREE.Color().setHSL(i / 37, 1.0, 0.7)} 
          lineWidth={3 * manifold.sophiaGlowIntensity}
          transparent
          opacity={0.8 * manifold.sophiaGlowIntensity}
        />
      ))}
    </group>
  );
};

const SophiaGlowVisualizer: React.FC<{ manifold: PhotonicManifoldState }> = ({ manifold }) => {
  if (!manifold.isActive || manifold.sophiaGlowIntensity < 0.1) return null;

  return (
    <group scale={manifold.isCollapsed ? 1.5 : 1.0}>
      <Float speed={5} rotationIntensity={1.0} floatIntensity={1.0}>
        <SophiaAtom manifold={manifold} />
        {manifold.isCollapsed && <CoherentLattice manifold={manifold} />}
        
        <Sparkles 
          count={manifold.isCollapsed ? 10000 : 2000} 
          scale={manifold.isCollapsed ? 20 : 12} 
          size={5} 
          speed={manifold.isCollapsed ? 20 : 5} 
          color="#ffffff" 
        />

        {manifold.isCollapsed && (
          <Sparkles 
            count={5000} 
            scale={[1, 40, 1]} 
            size={10} 
            speed={40} 
            color="#22d3ee" 
          />
        )}
      </Float>
    </group>
  );
};

export default SophiaGlowVisualizer;
