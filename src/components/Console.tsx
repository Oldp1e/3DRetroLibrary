import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface ConsoleProps {
  hasSelectedGame?: boolean;
}

const Console: React.FC<ConsoleProps> = ({ hasSelectedGame = false }) => {
  const meshRef = useRef<Mesh>(null);
  const slotRef = useRef<Mesh>(null);

  // Animação sutil de brilho
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      // Efeito de "respiração" no brilho
      const intensity = 0.1 + Math.sin(time * 2) * 0.05;
      (meshRef.current.material as any).emissiveIntensity = intensity;

      // Efeito especial no slot quando há cartucho selecionado
      if (slotRef.current) {
        if (hasSelectedGame) {
          const glowIntensity = 0.5 + Math.sin(time * 5) * 0.3;
          (slotRef.current.material as any).emissiveIntensity = glowIntensity;
        } else {
          (slotRef.current.material as any).emissiveIntensity = 0;
        }
      }
    }
  });

  return (
    <group>
      {/* Base do console */}
      <mesh ref={meshRef} position={[0, -2, -1]}>
        <boxGeometry args={[6, 0.5, 2]} />
        <meshStandardMaterial 
          color="#2a2a2a"
          roughness={0.2}
          metalness={0.8}
          emissive="#333333"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Slot para cartucho */}
      <mesh ref={slotRef} position={[0, -1.7, -0.8]}>
        <boxGeometry args={[1.2, 0.2, 0.4]} />
        <meshStandardMaterial 
          color={hasSelectedGame ? "#ff6600" : "#000000"}
          roughness={0.1}
          metalness={0.9}
          emissive={hasSelectedGame ? "#ff6600" : "#000000"}
          emissiveIntensity={0}
        />
      </mesh>

      {/* Detalhes decorativos */}
      <mesh position={[-2, -1.7, -1]}>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshStandardMaterial 
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
        />
      </mesh>

      <mesh position={[2, -1.7, -1]}>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshStandardMaterial 
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Luzes do console */}
      <pointLight
        position={[0, -1.5, -0.5]}
        color="#00ffff"
        intensity={0.5}
        distance={4}
      />
    </group>
  );
};

export default Console;
