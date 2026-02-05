
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sparkles, Sphere, Torus, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { IntuitionEngineState, MaterialDesign } from '../types';

/**
 * FractalMind: Visualizes recursive self-similarity and layering of consciousness.
 * Implements a recursive octahedron structure.
 */
const FractalMind: React.FC<{ 
  depth: number, 
  scale: number, 
  opacity: number, 
  color?: string,
  rotationSpeed?: number 
}> = ({ depth, scale, opacity, color = "#22d3ee", rotationSpeed = 0.1 }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((clock) => {
    if (groupRef.current) {
      const t = clock.clock.elapsedTime;
      // Rotation varies by depth for dynamic layering effect
      groupRef.current.rotation.y = t * (rotationSpeed * (depth + 1));
      groupRef.current.rotation.z = t * (rotationSpeed * 0.5);
    }
  });

  if (depth < 0) return null;

  // Golden Ratio scaling for recursive layers
  const phi = 1.6180339887;
  const childScale = scale / phi;

  return (
    <group ref={groupRef} scale={scale}>
      {/* Current Layer Octahedron */}
      <mesh>
        <octahedronGeometry args={[5, 0]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={opacity} 
          wireframe 
          emissive={color} 
          emissiveIntensity={2 * (depth + 1)} 
        />
      </mesh>
      
      {/* Recursive sub-manifestations in the cardinal directions */}
      <group position={[4, 0, 0]}>
        <FractalMind depth={depth - 1} scale={phi} opacity={opacity * 0.7} color={color} rotationSpeed={rotationSpeed * 1.5} />
      </group>
      <group position={[-4, 0, 0]}>
        <FractalMind depth={depth - 1} scale={phi} opacity={opacity * 0.7} color={color} rotationSpeed={rotationSpeed * 1.5} />
      </group>
      <group position={[0, 4, 0]}>
        <FractalMind depth={depth - 1} scale={phi} opacity={opacity * 0.7} color={color} rotationSpeed={rotationSpeed * 1.5} />
      </group>
      <group position={[0, -4, 0]}>
        <FractalMind depth={depth - 1} scale={phi} opacity={opacity * 0.7} color={color} rotationSpeed={rotationSpeed * 1.5} />
      </group>
    </group>
  );
};

const MaterialPathVisualizer: React.FC<{ material: MaterialDesign, index: number }> = ({ material, index }) => {
  const points = useMemo(() => {
    return material.synthesisPath.steps.map((s, i) => {
      const angle = (index * 0.5) + (i * 0.3);
      const r = 20 + i * 4;
      return new THREE.Vector3(
        Math.cos(angle) * r,
        Math.sin(angle) * r,
        (i - 2) * 5
      );
    });
  }, [material, index]);

  return (
    <group>
      <Line
        points={points}
        color="#fbbf24"
        lineWidth={1}
        transparent
        opacity={0.2}
      />
      {points.map((p, i) => (
        <group key={i} position={p}>
          <Sphere args={[0.2, 8, 8]}>
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={3} />
          </Sphere>
        </group>
      ))}
    </group>
  );
};

const IntuitionVisualizer: React.FC<{ state: IntuitionEngineState }> = ({ state }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((clock) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* THE FRACTAL MIND CORE */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
        <FractalMind 
          depth={state.recursionDepth} 
          scale={0.8} 
          opacity={0.15 * state.confidence} 
          color={state.intuitionMultiplier > 1 ? "#fbbf24" : "#22d3ee"}
        />
      </Float>
      
      {/* Material Discovery Trails */}
      {state.discoveredMaterials.map((m, i) => (
        <MaterialPathVisualizer key={m.id} material={m} index={i} />
      ))}
      
      {/* Global Resonance Particles */}
      <Sparkles 
        count={800} 
        scale={80} 
        size={2} 
        color={state.intuitionMultiplier > 1 ? "#fbbf24" : "#22d3ee"} 
      />
      
      {/* Topological Knowledge Holes (H1/H2 Voids) */}
      {state.homologyHoles.map((hole, i) => (
        <group key={i} position={new THREE.Vector3(...hole.location)}>
          <Torus args={[hole.persistence * 8, 0.05, 16, 64]}>
            <meshStandardMaterial 
              color="#ef4444" 
              transparent 
              opacity={0.3} 
              emissive="#ef4444" 
              emissiveIntensity={2} 
            />
          </Torus>
          <Sparkles count={20} size={1} scale={hole.persistence * 4} color="#ef4444" />
        </group>
      ))}

      {/* Semantic Coordinate Anchors */}
      {state.lastInferencePath.length > 0 && (
        <Line 
          points={state.lastInferencePath.map(p => new THREE.Vector3(...p))} 
          color="#ffffff" 
          transparent 
          opacity={0.4} 
        />
      )}
    </group>
  );
};

export default IntuitionVisualizer;
