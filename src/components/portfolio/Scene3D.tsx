import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, TorusKnot, Sphere } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Knot() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
      <TorusKnot ref={ref} args={[1, 0.32, 220, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.8}
          distort={0.35}
          speed={1.5}
        />
      </TorusKnot>
    </Float>
  );
}

function Orb({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[0.4 * scale, 32, 32]} position={position}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.2} metalness={0.6} />
      </Sphere>
    </Float>
  );
}

function Ring({ position }: { position: [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = s.clock.elapsedTime * 0.3;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.4) * 0.5;
  });
  return (
    <Float speed={1} floatIntensity={1.5}>
      <Icosahedron ref={ref} args={[0.7, 0]} position={position}>
        <meshStandardMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={0.5} wireframe />
      </Icosahedron>
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 2]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#a855f7" />
      <pointLight position={[-5, -3, 2]} intensity={1} color="#22d3ee" />
      <Knot />
      <Orb position={[-2.5, 1.5, -1]} color="#22d3ee" scale={1.2} />
      <Orb position={[2.8, -1.2, -2]} color="#e0afa0" scale={0.8} />
      <Orb position={[2, 2, -3]} color="#a855f7" scale={0.6} />
      <Ring position={[-2.2, -1.5, -2]} />
    </Canvas>
  );
}

export function ContactScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#a855f7" />
      <pointLight position={[-3, -3, 3]} intensity={1} color="#22d3ee" />
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Icosahedron args={[1.5, 1]}>
          <MeshDistortMaterial color="#a855f7" emissive="#7c3aed" emissiveIntensity={0.3} distort={0.5} speed={2} roughness={0.2} metalness={0.7} wireframe />
        </Icosahedron>
      </Float>
    </Canvas>
  );
}
