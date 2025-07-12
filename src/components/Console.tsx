import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';

interface ConsoleProps {
  hasSelectedGame?: boolean;
}

const Console: React.FC<ConsoleProps> = ({ hasSelectedGame = false }) => {
  const meshRef = useRef<Mesh>(null);
  const slotRef = useRef<Mesh>(null);
  const visorRef = useRef<Mesh>(null);
  const button1Ref = useRef<Mesh>(null);
  const button2Ref = useRef<Mesh>(null);

  // Animação sutil de brilho
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      // Efeito de "respiração" no brilho do console
      const intensity = 0.1 + Math.sin(time * 2) * 0.05;
      (meshRef.current.material as any).emissiveIntensity = intensity;
    }

    // Efeito especial no slot quando há cartucho selecionado
    if (slotRef.current) {
      if (hasSelectedGame) {
        const glowIntensity = 0.5 + Math.sin(time * 5) * 0.3;
        (slotRef.current.material as any).emissiveIntensity = glowIntensity;
      } else {
        (slotRef.current.material as any).emissiveIntensity = 0;
      }
    }

    // Visor digital piscando
    if (visorRef.current) {
      const visorGlow = hasSelectedGame 
        ? 0.8 + Math.sin(time * 8) * 0.2
        : 0.3 + Math.sin(time * 3) * 0.1;
      (visorRef.current.material as any).emissiveIntensity = visorGlow;
    }

    // Botões brilhando quando cartucho inserido
    if (button1Ref.current && button2Ref.current) {
      const buttonGlow = hasSelectedGame 
        ? 0.7 + Math.sin(time * 4) * 0.3
        : 0.2 + Math.sin(time * 2) * 0.1;
      (button1Ref.current.material as any).emissiveIntensity = buttonGlow;
      (button2Ref.current.material as any).emissiveIntensity = buttonGlow;
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

      {/* Visor digital */}
      <mesh ref={visorRef} position={[0, -1.4, -0.95]}>
        <boxGeometry args={[2, 0.4, 0.1]} />
        <meshStandardMaterial 
          color="#000011"
          emissive={hasSelectedGame ? "#00ff00" : "#0066ff"}
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Texto do visor */}
      <Text
        position={[0, -1.4, -0.9]}
        fontSize={0.08}
        color={hasSelectedGame ? "#00ff00" : "#0066ff"}
        anchorX="center"
        anchorY="middle"
      >
        {hasSelectedGame ? ">>> GAME LOADED <<<" : "*** READY ***"}
      </Text>

      {/* Botões melhorados */}
      <mesh ref={button1Ref} position={[-2, -1.7, -1]}>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshStandardMaterial 
          color={hasSelectedGame ? "#00ffff" : "#004466"}
          emissive="#00ffff"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      <mesh ref={button2Ref} position={[2, -1.7, -1]}>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshStandardMaterial 
          color={hasSelectedGame ? "#ff00ff" : "#440044"}
          emissive="#ff00ff"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Detalhes decorativos extras */}
      <mesh position={[-1, -1.5, -0.95]}>
        <boxGeometry args={[0.1, 0.1, 0.05]} />
        <meshStandardMaterial 
          color="#ff6600"
          emissive="#ff6600"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh position={[1, -1.5, -0.95]}>
        <boxGeometry args={[0.1, 0.1, 0.05]} />
        <meshStandardMaterial 
          color="#ff6600"
          emissive="#ff6600"
          emissiveIntensity={0.6}
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
