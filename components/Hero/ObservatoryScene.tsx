'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FIELD_COUNT = 1400;
const NODE_COUNT = 16; // one marker per application in the real catalog

function fieldGeometry() {
  const positions = new Float32Array(FIELD_COUNT * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < FIELD_COUNT; i += 1) {
    const t = i / FIELD_COUNT;
    const radius = 3.2 + Math.pow(t, 0.6) * 5.5;
    const inclination = Math.acos(1 - 2 * ((i + 0.5) / FIELD_COUNT));
    const azimuth = golden * i;
    positions[i * 3] = radius * Math.sin(inclination) * Math.cos(azimuth);
    positions[i * 3 + 1] = radius * Math.cos(inclination) * 0.55;
    positions[i * 3 + 2] = radius * Math.sin(inclination) * Math.sin(azimuth);
  }
  return positions;
}

function nodeGeometry() {
  const positions = new Float32Array(NODE_COUNT * 3);
  for (let i = 0; i < NODE_COUNT; i += 1) {
    const angle = (i / NODE_COUNT) * Math.PI * 2;
    const radius = 4.4 + (i % 3) * 0.6;
    positions[i * 3] = radius * Math.cos(angle);
    positions[i * 3 + 1] = Math.sin(angle * 2.3) * 1.1;
    positions[i * 3 + 2] = radius * Math.sin(angle);
  }
  return positions;
}

function DataField({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const fieldPositions = useMemo(fieldGeometry, []);
  const nodePositions = useMemo(nodeGeometry, []);

  useFrame((state, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.035;
    const targetX = state.pointer.y * 0.12;
    const targetY = state.pointer.x * 0.18;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03;
    groupRef.current.rotation.z += (targetY - groupRef.current.rotation.z) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[fieldPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#c98a2c" transparent opacity={0.55} sizeAttenuation />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.09} color="#5b6ee8" transparent opacity={0.9} sizeAttenuation />
      </points>
    </group>
  );
}

export default function ObservatoryScene({ reducedMotion }: { reducedMotion: boolean }) {
  const dpr: [number, number] | number = reducedMotion ? 1 : [1, 1.75];
  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 11], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <ambientLight intensity={0.4} />
      <DataField reducedMotion={reducedMotion} />
    </Canvas>
  );
}
