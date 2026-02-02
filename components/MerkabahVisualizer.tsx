
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, Text, MeshDistortMaterial, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import { MerkabahState } from '../types';

interface TetraProps {
  invert?: boolean;
  rotation: [number, number, number];
  color: string;
  activation: number;
}

const Tetrahedron: React.FC<TetraProps> = ({ invert = false, rotation, color, activation }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const position: [number, number, number] = [0, 0, invert ? -0.5 : 0.5];
  
  const geometry = useMemo(() => {
    const geo = new THREE.TetrahedronGeometry(1.5);
    if (invert) geo.rotateX(Math.PI);
    return geo;
  }, [invert]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.set(...rotation);
      const scale = 1 + (activation * 0.2);
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshStandardMaterial 
        color={color} 
        wireframe 
        emissive={color} 
        emissiveIntensity={0.5 + activation * 4}
        transparent
        opacity={0.1 + (activation * 0.7)}
      />
    </mesh>
  );
};

const QuantumLattice: React.FC<{ coherence: number; active: boolean }> = ({ coherence, active }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.005 * coherence;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05 * coherence);
    }
  });

  if (!active) return null;

  return (
    <group ref={meshRef}>
      {[...Array(6)].map((_, i) => (
        <Line
          key={i}
          points={[[-5, 0, 0], [5, 0, 0]]}
          color="#f472b6"
          lineWidth={1}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          transparent
          opacity={coherence * 0.3}
        />
      ))}
    </group>
  );
};

const GalacticNodes: React.FC<{ power: number }> = ({ power }) => {
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 20 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002 * (power / 10);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <PointMaterial 
        size={0.15} 
        color={power > 50 ? "#4f46e5" : "#0ea5e9"} 
        transparent 
        opacity={0.2 + (power / 200)} 
        sizeAttenuation 
      />
    </points>
  );
};

const MerkabahVisualizer: React.FC<{ state: MerkabahState }> = ({ state }) => {
  return (
    <div className="w-full h-full relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={45} />
        <ambientLight intensity={0.1} />
        <pointLight position={[15, 15, 15]} intensity={3} color="#4f46e5" />
        <pointLight position={[-15, -15, -15]} intensity={1.5} color="#f472b6" />
        
        <Stars radius={200} depth={100} count={10000} factor={6} saturation={1} fade speed={0.5} />
        
        <GalacticNodes power={state.powerOutputGW} />
        <QuantumLattice coherence={state.quantumCoherence} active={state.activation > 0.4} />

        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.4}>
          <group scale={1.3}>
            <Tetrahedron rotation={state.rotationUp} color="#22d3ee" activation={state.activation} />
            <Tetrahedron invert rotation={state.rotationDown} color="#fbbf24" activation={state.activation} />
            
            <mesh>
              <sphereGeometry args={[0.35, 32, 32]} />
              <MeshDistortMaterial
                color="#fefce8"
                speed={10}
                distort={0.5}
                radius={1.2}
                emissive="#ffffff"
                emissiveIntensity={state.activation * 8}
              />
            </mesh>
          </group>
        </Float>

        <Text
          position={[0, -7.5, 0]}
          fontSize={0.25}
          color="#f8fafc"
          font="https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6rjS3F9_f0.woff2"
        >
          {`GALACTIC FLUX: ${state.powerOutputGW.toFixed(1)}GW | Q-ENTROPY: ${state.encryptionEntropy.toFixed(4)}`}
        </Text>
      </Canvas>
    </div>
  );
};

export default MerkabahVisualizer;
