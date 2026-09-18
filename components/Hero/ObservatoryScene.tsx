'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const FIELD_COUNT = 1400;

interface AppDatum {
  name: string;
  count: number;
}

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

function nodePosition(i: number, count: number): [number, number, number] {
  const angle = (i / count) * Math.PI * 2;
  const radius = 4.4 + (i % 3) * 0.6;
  return [radius * Math.cos(angle), Math.sin(angle * 2.3) * 1.1, radius * Math.sin(angle)];
}

/** Node radius scaled by each application's real share of the 301-repo catalog (sqrt scale so one huge tool doesn't swallow the rest). */
function nodeScale(count: number, min: number, max: number) {
  const t = max === min ? 0.5 : (Math.sqrt(count) - Math.sqrt(min)) / (Math.sqrt(max) - Math.sqrt(min));
  return 0.055 + t * 0.16;
}

function ApplicationNode({
  app,
  position,
  radius,
  hovered,
  onHover,
}: {
  app: AppDatum;
  position: [number, number, number];
  radius: number;
  hovered: boolean;
  onHover: (v: boolean) => void;
}) {
  return (
    <mesh
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
      }}
      onPointerOut={() => onHover(false)}
    >
      <sphereGeometry args={[hovered ? radius * 1.35 : radius, 12, 12]} />
      <meshBasicMaterial color={hovered ? '#c98a2c' : '#5b6ee8'} transparent opacity={hovered ? 1 : 0.85} />
      {hovered && (
        <Html center distanceFactor={9} style={{ pointerEvents: 'none' }}>
          <div className="whitespace-nowrap rounded bg-ink-900/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-paper">
            {app.name} &middot; {app.count} repo{app.count === 1 ? '' : 's'}
          </div>
        </Html>
      )}
    </mesh>
  );
}

function DataField({ reducedMotion, applications }: { reducedMotion: boolean; applications: AppDatum[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const fieldPositions = useMemo(fieldGeometry, []);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const counts = applications.map((a) => a.count);
  const min = Math.min(...counts);
  const max = Math.max(...counts);

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
      {applications.map((app, i) => (
        <ApplicationNode
          key={app.name}
          app={app}
          position={nodePosition(i, applications.length)}
          radius={nodeScale(app.count, min, max)}
          hovered={hoveredIndex === i}
          onHover={(v) => setHoveredIndex(v ? i : null)}
        />
      ))}
    </group>
  );
}

export default function ObservatoryScene({
  reducedMotion,
  applications,
}: {
  reducedMotion: boolean;
  applications: AppDatum[];
}) {
  const dpr: [number, number] | number = reducedMotion ? 1 : [1, 1.75];
  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 11], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <ambientLight intensity={0.4} />
      <DataField reducedMotion={reducedMotion} applications={applications} />
    </Canvas>
  );
}
