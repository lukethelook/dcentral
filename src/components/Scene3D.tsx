'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  
  // Generate random particles
  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Rotate based on time
    ref.current.rotation.x += delta * 0.05;
    ref.current.rotation.y += delta * 0.08;
    
    // React to mouse position
    ref.current.rotation.x += mouse.y * 0.01;
    ref.current.rotation.y += mouse.x * 0.01;
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff88"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingOrb() {
  const ref = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!ref.current) return;
    
    // Float animation
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
    
    // Follow mouse slightly
    ref.current.position.x += mouse.x * 0.5;
    ref.current.position.y += mouse.y * 0.3;
    
    // Rotate
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#00ff88"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function GlowingSphere() {
  const ref = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!ref.current) return;
    
    // Pulse animation
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    ref.current.scale.setScalar(scale);
    
    // React to mouse
    ref.current.position.x = mouse.x * 2;
    ref.current.position.y = mouse.y * 2;
  });

  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial
        color="#00ff88"
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
        <FloatingOrb />
        <GlowingSphere />
      </Canvas>
    </div>
  );
}
