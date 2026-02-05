
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, Sparkles, MeshDistortMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import { NucleoState, PhotonicManifoldState } from '../types';

const ModeRays: React.FC<{ manifold: PhotonicManifoldState }> = ({ manifold }) => {
  const points = useMemo(() => {
    const pts = [];
    const count = manifold.dimensions;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = Math.cos(theta) * Math.sin(phi) * 5;
      const y = Math.sin(theta) * Math.sin(phi) * 5;
      const z = Math.cos(phi) * 5;
      pts.push([new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)]);
    }
    return pts;
  }, [manifold.dimensions]);

  return (
    <group>
      {points.map((p, i) => (
        <Line 
          key={i} 
          points={p as [THREE.Vector3, THREE.Vector3]} 
          color={new THREE.Color().setHSL(i / 37, 0.8, 0.5)} 
          lineWidth={2 * manifold.entanglementFidelity}
          transparent
          opacity={manifold.modeStability[i] * 0.6}
        />
      ))}
    </group>
  );
};

const AdamantiumSphere: React.FC<{ state: NucleoState, photonic: PhotonicManifoldState }> = ({ state, photonic }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((clock) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.clock.elapsedTime * (photonic.isActive ? 0.5 : 0.2);
      meshRef.current.rotation.z = clock.clock.elapsedTime * 0.1;
      const s = 1 + Math.sin(clock.clock.elapsedTime * (1 + state.coherence * 5)) * 0.05 * state.sphereSuspension;
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <MeshDistortMaterial 
        color={photonic.isActive ? "#ffffff" : "#083344"} 
        distort={photonic.isActive ? 0.4 : 0.2 * (1 - state.vacuumStability)} 
        speed={photonic.isActive ? 4 : 2} 
        roughness={0.1}
        metalness={1.0}
        emissive={photonic.isActive ? "#22d3ee" : "#06b6d4"}
        emissiveIntensity={photonic.isActive ? 5 * photonic.entanglementFidelity : state.coherence * 2}
        transparent
        opacity={photonic.isActive ? 0.3 : 1.0}
      />
    </mesh>
  );
};

const PhotonicLattice: React.FC<{ manifold: PhotonicManifoldState }> = ({ manifold }) => {
  const points = useMemo(() => {
    const pts = [];
    const count = 37;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = Math.cos(theta) * Math.sin(phi) * 4;
      const y = Math.sin(theta) * Math.sin(phi) * 4;
      const z = Math.cos(phi) * 4;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((clock) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = clock.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <group key={i} position={p}>
          <Sphere args={[0.2, 8, 8]}>
            <meshStandardMaterial 
              color={new THREE.Color().setHSL(i / 37, 1.0, 0.5)} 
              emissive={new THREE.Color().setHSL(i / 37, 1.0, 0.5)} 
              emissiveIntensity={10 * manifold.ghzCoherence} 
            />
          </Sphere>
        </group>
      ))}
    </group>
  );
};

const NucleoVisualizer: React.FC<{ state: NucleoState, photonic?: PhotonicManifoldState }> = ({ state, photonic }) => {
  if (!state.isActive) return null;

  const manifold = photonic || { isActive: false, dimensions: 37, bridgeActive: false, ghzCoherence: 0, entanglementFidelity: 0, modeStability: [] };

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <AdamantiumSphere state={state} photonic={manifold as PhotonicManifoldState} />
        {manifold.isActive && (
          <>
            <ModeRays manifold={manifold as PhotonicManifoldState} />
            <PhotonicLattice manifold={manifold as PhotonicManifoldState} />
          </>
        )}
        
        <Sparkles 
          count={manifold.isActive ? 5000 : 800} 
          scale={manifold.isActive ? 15 : 10} 
          size={manifold.isActive ? 4 : 2} 
          speed={manifold.isActive ? 5 : 2} 
          color={manifold.isActive ? "#ffffff" : "#06b6d4"} 
        />
        
        {state.currentLevel === 'Unity' && (
          <Sparkles count={2000} scale={20} size={4} speed={10} color="#ffffff" />
        )}
      </Float>
    </group>
  );
};

export default NucleoVisualizer;
