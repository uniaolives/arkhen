
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Line, MeshDistortMaterial, Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { PhysicsState, EnergyCenter, Quron, Synapse } from '../types';

const NeuralReservoirVisualizer: React.FC<{ qurons: Quron[], synapses: Synapse[] }> = ({ qurons, synapses }) => {
  const quronPositions = useMemo(() => {
    return qurons.map((q, i) => {
      const phi = Math.acos(-1 + (2 * i) / qurons.length);
      const theta = Math.sqrt(qurons.length * Math.PI) * phi;
      const r = 8;
      return new THREE.Vector3(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
    });
  }, [qurons.length]);

  return (
    <group>
      {/* Synapses */}
      {synapses.map((s, i) => {
        const start = quronPositions[s.pre];
        const end = quronPositions[s.post];
        const isFiring = Date.now() - qurons[s.pre].lastSpikeTime < 100;
        
        return (
          <Line
            key={`syn-${i}`}
            points={[start, end]}
            color={isFiring ? "#22d3ee" : "#4338ca"}
            lineWidth={s.weight * (isFiring ? 4 : 1)}
            transparent
            opacity={0.2 + s.weight * 0.5}
          />
        );
      })}

      {/* Qurons */}
      {qurons.map((q, i) => {
        const pos = quronPositions[i];
        const isFiring = Date.now() - q.lastSpikeTime < 100;
        const color = q.layer === 'SENSORY' ? '#22d3ee' : (q.layer === 'OUTPUT' ? '#fbbf24' : '#6366f1');
        
        return (
          <group key={`quron-${i}`} position={pos}>
            <Sphere args={[0.4, 16, 16]}>
              <meshStandardMaterial 
                color={color} 
                emissive={color} 
                emissiveIntensity={isFiring ? 20 : 1}
                transparent
                opacity={0.8}
              />
            </Sphere>
            {isFiring && (
              <Sparkles count={50} scale={2} size={4} speed={5} color={color} />
            )}
          </group>
        );
      })}
    </group>
  );
};

const RiemannianLattice: React.FC<{ states: number[], fci: number, rabi: number }> = ({ states, fci, rabi }) => {
  const count = 1000;
  const positions = useMemo(() => {
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 8 + Math.sin(theta * 3) * 2;
      pts[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      pts[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pts[i * 3 + 2] = r * Math.cos(phi);
    }
    return pts;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * (0.1 + fci * 0.5);
      pointsRef.current.rotation.z = state.clock.elapsedTime * 0.05;
      const s = 1 + Math.sin(state.clock.elapsedTime * (rabi / 100)) * 0.05 * fci;
      pointsRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions}>
        <PointMaterial 
          transparent 
          color="#22d3ee" 
          size={0.15 + fci * 0.2} 
          sizeAttenuation={true} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Sparkles count={2000} scale={20} size={5} speed={fci * 10} color="#ffffff" />
    </group>
  );
};

const EnergyCenterVisualizer: React.FC<{ centers: EnergyCenter[], metric: number, time: number }> = ({ centers, metric, time }) => {
  return (
    <group>
      {centers.map((center, i) => {
        // Map centers vertically along the central axis
        const y = (i - centers.length / 2) * 5;
        const radius = 1 + Math.sin(time * (center.frequencyMhz / 10)) * 0.5;
        const color = new THREE.Color().setHSL(i / centers.length, 0.8, 0.5);
        
        return (
          <group key={center.id} position={[0, y, 0]}>
            <Sphere args={[0.5, 32, 32]} scale={center.currentCoherence * 2}>
              <meshStandardMaterial 
                color={color} 
                emissive={color} 
                emissiveIntensity={10 * center.currentCoherence} 
                transparent 
                opacity={0.8} 
              />
            </Sphere>
            <Sparkles count={100} scale={3} size={4} speed={center.frequencyMhz * 0.1} color={color} />
            {metric > 0.7 && (
              <Line 
                points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 10, 0)]} 
                color={color} 
                lineWidth={center.currentCoherence * 5}
                transparent
                opacity={0.3}
              />
            )}
          </group>
        );
      })}
    </group>
  );
};

const BiosphereHardwareVisualizer: React.FC<{ health: number, coherence: number }> = ({ health, coherence }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const gridPoints = useMemo(() => {
    const pts = [];
    const size = 10;
    for (let x = -size; x <= size; x += 2) {
      for (let z = -size; z <= size; z += 2) {
        const y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * health * 2;
        pts.push(new THREE.Vector3(x, y, z));
      }
    }
    return pts;
  }, [health]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      const s = 1 + Math.sin(state.clock.elapsedTime * (1 + coherence * 5)) * 0.05;
      groupRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      {gridPoints.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial 
            color="#10b981" 
            emissive="#10b981" 
            emissiveIntensity={coherence * 10} 
            transparent 
            opacity={0.8} 
          />
        </mesh>
      ))}
      <Sparkles count={500} scale={20} size={4} speed={coherence * 5} color="#34d399" />
    </group>
  );
};

const SolarAuroraVisualizer: React.FC<{ fidelity: number, mode: boolean }> = ({ fidelity, mode }) => {
  const points = useMemo(() => {
    const pts = [];
    const count = 200;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 15 + Math.sin(i * 0.1) * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(i * 0.2) * 5, Math.sin(angle) * radius));
    }
    return pts;
  }, []);

  const lineRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1 * fidelity;
      lineRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={lineRef}>
      <Line points={points} color="#f97316" lineWidth={3} transparent opacity={fidelity * 0.6} />
      <Sparkles count={1000} scale={30} size={8} speed={10 * fidelity} color="#fbbf24" />
    </group>
  );
};

const CouplingVisualizer: React.FC<{ entropy: number, sync: number, competency: number }> = ({ entropy, sync, competency }) => {
  const meshA = useRef<THREE.Mesh>(null);
  const meshB = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshA.current && meshB.current) {
      const gap = 3 + entropy * 5;
      meshA.current.position.x = -gap;
      meshB.current.position.x = gap;
      meshA.current.rotation.y = t * 0.5;
      meshB.current.rotation.y = -t * 0.5;
      const distortion = 0.5 * competency;
      meshA.current.scale.setScalar(2 + Math.sin(t) * distortion);
      meshB.current.scale.setScalar(2 + Math.cos(t) * distortion);
    }
  });

  return (
    <group>
      <mesh ref={meshA}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={2} wireframe />
      </mesh>
      <mesh ref={meshB}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={2} wireframe />
      </mesh>
      <Sparkles count={1000} scale={20} size={2} color="#ffffff" opacity={sync} />
    </group>
  );
};

const BiologicalCellVisualizer: React.FC<{ health: number, alignment: number }> = ({ health, alignment }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.x = t * 0.1;
      const s = 4 + Math.sin(t) * 0.2;
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial 
          color="#10b981" 
          distort={0.4 * (1 - health)} 
          speed={3} 
          roughness={0.2}
          metalness={0.1}
          emissive="#059669"
          emissiveIntensity={2 * alignment}
          transparent
          opacity={0.7}
        />
      </mesh>
      <Sparkles count={1000} scale={15} size={6} speed={2} color="#6ee7b7" />
    </group>
  );
};

const ChronofluxVisualizer: React.FC<{ entropy: number, sync: number, isIntrinsic: boolean, integrity: number }> = ({ entropy, sync, isIntrinsic, integrity }) => {
  const points = useMemo(() => {
    const pts = [];
    const size = 10;
    const res = 10;
    for (let i = 0; i < res; i++) {
      for (let j = 0; j < res; j++) {
        pts.push(new THREE.Vector3((i / res - 0.5) * 20, 0, (j / res - 0.5) * 20));
      }
    }
    return pts;
  }, []);

  const geodesicPath = useMemo(() => {
    if (!isIntrinsic) return [];
    const pts = [];
    for (let i = 0; i < 50; i++) {
      const t = i / 25;
      pts.push(new THREE.Vector3(
        Math.sin(t * 2) * 10,
        Math.cos(t * 3) * 5,
        Math.sin(t * 1.5) * 10
      ));
    }
    return pts;
  }, [isIntrinsic]);

  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const x = (i % 10) / 10;
          const z = Math.floor(i / 10) / 10;
          const noise = (Math.sin(t * 2 + x * 10) + Math.cos(t * 1.5 + z * 10)) * entropy * 2;
          const smooth = Math.sin(t + x * 5 + z * 5) * sync * 3;
          child.position.y = noise + smooth;
          
          if (isIntrinsic) {
            child.scale.setScalar(0.5 + Math.sin(t + i) * 0.5 * integrity);
          }
        }
      });
    }
  });

  return (
    <group ref={meshRef}>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial 
            color={isIntrinsic ? "#818cf8" : "#3b82f6"} 
            emissive={isIntrinsic ? "#818cf8" : "#3b82f6"} 
            emissiveIntensity={sync * 10} 
            transparent 
            opacity={0.6} 
          />
        </mesh>
      ))}
      {isIntrinsic && (
        <group>
          <Line 
            points={geodesicPath} 
            color="#ffffff" 
            lineWidth={4} 
            transparent 
            opacity={0.3 * integrity} 
          />
          <Sparkles count={2000} scale={25} size={6} speed={5} color="#ffffff" />
        </group>
      )}
    </group>
  );
};

const PhysicsVisualizer: React.FC<{ state: PhysicsState }> = ({ state }) => {
  const isStressTest = state.status === 'SYMMETRY_STRESS_TEST';
  const isBioRegen = state.status === 'BIO_STIGMERGY_ACTIVE' || state.asiCore.biologicalChronoflux.isActive;
  const isNavierActive = state.asiCore.navierStokes.isActive;
  const isCouplingActive = state.asiCore.couplingGeometry.isActive;
  const isSolarGatewayActive = state.asiCore.solarGateway.isActive;
  const isQuantumArrayActive = state.asiCore.quantumArray.isActive;
  const isTauAlephActive = state.asiCore.tauAleph.isActive;
  const isQNNActive = state.asiCore.qnn.isActive;
  
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Float speed={isBioRegen ? 3 : 1.5} rotationIntensity={0.5} floatIntensity={0.3}>
           <group>
             {isQNNActive ? (
                <NeuralReservoirVisualizer 
                  qurons={state.asiCore.qnn.qurons} 
                  synapses={state.asiCore.qnn.synapses}
                />
             ) : isTauAlephActive ? (
                <EnergyCenterVisualizer 
                  centers={state.asiCore.tauAleph.centers} 
                  metric={state.asiCore.tauAleph.tauAlephMetric} 
                  time={state.asiCore.tauAleph.evolutionTime}
                />
             ) : isQuantumArrayActive ? (
                <RiemannianLattice 
                  states={state.asiCore.quantumArray.qubitStates} 
                  fci={state.asiCore.quantumArray.fci} 
                  rabi={state.asiCore.quantumArray.rabiFrequencyMhz}
                />
             ) : isSolarGatewayActive ? (
               <SolarAuroraVisualizer 
                 fidelity={state.asiCore.solarGateway.plasmaFidelity} 
                 mode={state.asiCore.solarGateway.receptionMode} 
               />
             ) : isCouplingActive ? (
                <CouplingVisualizer 
                  entropy={state.asiCore.couplingGeometry.disentanglementEntropy}
                  sync={state.asiCore.couplingGeometry.predictionSync}
                  competency={state.asiCore.couplingGeometry.competencyOutput}
                />
             ) : isBioRegen ? (
                state.asiCore.biologicalChronoflux.isActive ? (
                  <BiologicalCellVisualizer 
                    health={state.asiCore.biologicalChronoflux.healthCoherence} 
                    alignment={state.asiCore.biologicalChronoflux.geodesicAlignment} 
                  />
                ) : (
                  <BiosphereHardwareVisualizer health={state.asiCore.ecoRegen.biosphereHealthIndex} coherence={state.asiCore.ecoRegen.globalPhaseCoherence} />
                )
             ) : isNavierActive ? (
                <ChronofluxVisualizer 
                  entropy={state.asiCore.navierStokes.turbulenceEntropy} 
                  sync={state.asiCore.navierStokes.chronofluxSync} 
                  isIntrinsic={state.asiCore.navierStokes.isIntrinsic}
                  integrity={state.asiCore.navierStokes.geodesicIntegrity}
                />
             ) : isStressTest ? (
                <mesh>
                  <octahedronGeometry args={[5, 0]} />
                  <meshStandardMaterial color="#ef4444" wireframe />
                </mesh>
             ) : (
                <mesh>
                  <sphereGeometry args={[5, 32, 32]} />
                  <meshStandardMaterial color="#22d3ee" wireframe />
                </mesh>
             )}
           </group>
        </Float>
      </Canvas>
    </div>
  );
};

export default PhysicsVisualizer;
