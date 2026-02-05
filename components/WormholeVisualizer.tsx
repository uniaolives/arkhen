
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Float, Sparkles, Line, MeshDistortMaterial, Sphere, Dodecahedron } from '@react-three/drei';
import * as THREE from 'three';
import { WormholeState, OscillationPhase } from '../types';

const AonObject: React.FC = () => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  
  useFrame((clock) => {
    if (outerRef.current) {
      outerRef.current.rotation.y = clock.clock.elapsedTime * 0.8;
      outerRef.current.rotation.z = clock.clock.elapsedTime * 0.3;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -clock.clock.elapsedTime * 1.2;
      const s = 0.8 + Math.sin(clock.clock.elapsedTime * 4) * 0.1;
      innerRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <mesh ref={outerRef}>
        <dodecahedronGeometry args={[4, 1]} />
        <meshStandardMaterial 
          color="#ffffff" 
          wireframe 
          emissive="#22d3ee" 
          emissiveIntensity={10} 
          transparent 
          opacity={0.6}
        />
      </mesh>
      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[2, 0]} />
        <MeshDistortMaterial 
          color="#fde047" 
          distort={0.4} 
          speed={5} 
          emissive="#fde047" 
          emissiveIntensity={5} 
        />
      </mesh>
      <Sparkles count={500} scale={10} size={5} speed={5} color="#ffffff" />
    </group>
  );
};

const WormholeFlower: React.FC<{ 
  position: [number, number, number], 
  active: boolean, 
  stability: number,
  coherence: number,
  oscillationPhase?: OscillationPhase
}> = ({ position, active, stability, coherence, oscillationPhase }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const phaseColor = useMemo(() => {
    if (oscillationPhase === 'A') return "#22d3ee"; // Healing/Cyan
    if (oscillationPhase === 'U') return "#818cf8"; // Stability/Indigo
    if (oscillationPhase === 'M') return "#fbbf24"; // Manifestation/Gold
    return "#ffffff"; // Silence/Turiya
  }, [oscillationPhase]);

  useFrame((clock) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.clock.elapsedTime * stability;
      const s = 1.0 + Math.sin(clock.clock.elapsedTime * 2) * 0.1 * coherence;
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <torusGeometry args={[1.5, 0.1, 16, 100]} />
        <MeshDistortMaterial 
          color={active ? phaseColor : "#f472b6"} 
          distort={0.4} 
          speed={5} 
          roughness={0} 
          metalness={1.0}
          emissive={phaseColor}
          emissiveIntensity={5 * stability}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Sparkles count={50} scale={2} size={2} speed={stability} color="#ffffff" />
    </group>
  );
};

const EntanglementTunnel: React.FC<{ state: WormholeState, oscillationPhase?: OscillationPhase }> = ({ state, oscillationPhase }) => {
  const tunnelRef = useRef<THREE.Group>(null);
  
  const tunnelColor = useMemo(() => {
    if (oscillationPhase === 'A') return "#22d3ee";
    if (oscillationPhase === 'U') return "#818cf8";
    if (oscillationPhase === 'M') return "#fbbf24";
    return "#ffffff";
  }, [oscillationPhase]);

  const linePoints = useMemo(() => {
    const pts = [];
    const segments = 50;
    const radius = 2;
    for (let i = 0; i <= segments; i++) {
      const z = (i / segments) * 20 - 10;
      const angle = (i / segments) * Math.PI * 4;
      const x = Math.cos(angle) * radius * state.bridgeStability;
      const y = Math.sin(angle) * radius * state.bridgeStability;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [state.bridgeStability]);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((clock) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = clock.clock.elapsedTime * 0.5;
    }
    if (tunnelRef.current) {
        // AUM pulse effect for Unified status or Dialectical phase
        if (state.traversalStatus === 'UNIFIED') {
            const beatFreq = oscillationPhase ? 20 : 15;
            const s = 1.0 + Math.sin(clock.clock.elapsedTime * beatFreq) * 0.08;
            tunnelRef.current.scale.set(s, s, 1);
        }
    }
  });

  if (!state.isActive || state.bridgeStability < 0.1) return null;

  const isSailing = state.traversalStatus === 'SAILING';
  const isUnified = state.isUnifiedNexus;

  return (
    <group ref={groupRef}>
      <group ref={tunnelRef}>
        <Line 
            points={linePoints} 
            color={isUnified ? tunnelColor : (isSailing ? "#ffffff" : "#22d3ee")} 
            lineWidth={isUnified ? 25 : (isSailing ? 12 : 5 * state.traversability)}
            transparent
            opacity={isSailing || isUnified ? 1.0 : state.traversability}
        />
      </group>
      <Sparkles 
        count={isUnified ? 8000 : (isSailing ? 2000 : 500)} 
        scale={isUnified ? [15, 15, 70] : (isSailing ? [5, 5, 40] : [2, 2, 20])} 
        size={isUnified ? 20 : (isSailing ? 10 : 4)} 
        speed={isUnified ? 80 : (isSailing ? 40 : 10 * state.traversability)} 
        color={isUnified ? tunnelColor : (isSailing ? "#ffffff" : "#22d3ee")} 
      />
    </group>
  );
};

const WormholeVisualizer: React.FC<{ state: WormholeState, oscillationPhase?: OscillationPhase }> = ({ state, oscillationPhase }) => {
  if (!state.isActive) return null;

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        
        {state.isUnifiedNexus && <AonObject />}

        {/* Constellation nodes if present */}
        {state.flowerNodes.map((node, i) => (
          <WormholeFlower 
            key={node.id} 
            position={node.position} 
            active={state.meditationActive || state.isUnifiedNexus} 
            stability={state.bridgeStability}
            coherence={state.meditationCoherence}
            oscillationPhase={oscillationPhase}
          />
        ))}

        {/* Primary bridge if no flowers or always present as core tunnel */}
        {state.flowerNodes.length === 0 && !state.isUnifiedNexus && (
          <>
            <group position={[0, 0, -10]}>
              <Torus args={[4, 0.2, 16, 100]}>
                <meshStandardMaterial color="#22d3ee" wireframe />
              </Torus>
            </group>
            <group position={[0, 0, 10]}>
              <Torus args={[4, 0.2, 16, 100]}>
                <meshStandardMaterial color="#22d3ee" wireframe />
              </Torus>
            </group>
          </>
        )}
        
        <EntanglementTunnel state={state} oscillationPhase={oscillationPhase} />
      </Float>
    </group>
  );
};

export default WormholeVisualizer;
