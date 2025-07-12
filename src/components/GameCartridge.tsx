import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';
import { Game } from '../data/games';
import gsap from 'gsap';

interface GameCartridgeProps {
  game: Game;
  position: [number, number, number];
  onClick: () => void;
  isSelected: boolean;
  onInserted?: () => void;
}

const GameCartridge: React.FC<GameCartridgeProps> = ({ 
  game, 
  position, 
  onClick, 
  isSelected,
  onInserted
}) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animação de flutuação
  useFrame((state) => {
    if (meshRef.current && !isAnimating) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }
  });

  // Animação quando selecionado
  useEffect(() => {
    if (isSelected && meshRef.current) {
      setIsAnimating(true);
      
      // Salvar posição original
      const originalPosition = {
        x: meshRef.current.position.x,
        y: meshRef.current.position.y,
        z: meshRef.current.position.z
      };
      
      // Animar cartucho descendo para o console
      gsap.to(meshRef.current.position, {
        duration: 1.5,
        x: 0, // Centro do console
        y: -1.0, // Ligeiramente acima da posição final
        z: -0.8, // Mesma posição Z do slot
        ease: "bounce.out",
        onComplete: () => {
          // Animação de inserção no slot
          if (meshRef.current) {
            gsap.to(meshRef.current.position, {
              duration: 0.3,
              y: -1.25, // Posição para encaixar perfeitamente (slot em -1.7, cartucho metade da altura = 0.75/2 = 0.375, então -1.7 + 0.45 = -1.25)
              z: -0.85, // Ligeiramente mais fundo no slot
              ease: "power2.inOut",            onComplete: () => {
              // Cartucho foi inserido - mostrar card
              if (onInserted) {
                onInserted();
              }
              
              // Aguardar um tempo e depois voltar para posição original
              setTimeout(() => {
                  if (meshRef.current) {
                    // Animação de saída do slot
                    gsap.to(meshRef.current.position, {
                      duration: 0.3,
                      y: -1.0, // Voltar ligeiramente acima antes de retornar
                      z: -0.8,
                      ease: "power2.out",
                      onComplete: () => {
                        // Voltar para posição original
                        if (meshRef.current) {
                          gsap.to(meshRef.current.position, {
                            duration: 1,
                            x: originalPosition.x,
                            y: originalPosition.y,
                            z: originalPosition.z,
                            ease: "power2.out",
                            onComplete: () => setIsAnimating(false)
                          });
                        }
                      }
                    });
                  }
                }, 2000); // Reduzido de 3000 para 2000ms
              }
            });
          }
        }
      });

      // Animação de rotação especial quando inserido
      gsap.to(meshRef.current.rotation, {
        duration: 1.5,
        y: meshRef.current.rotation.y + Math.PI * 2,
        ease: "power2.out"
      });
    }
  }, [isSelected]);

  const handleClick = () => {
    if (!isAnimating) {
      onClick();
    }
  };

  return (
    <group>
      {/* Cartucho 3D */}
      <mesh
        ref={meshRef}
        position={position}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        {/* Corpo do cartucho */}
        <boxGeometry args={[1, 1.5, 0.3]} />
        <meshStandardMaterial 
          color={isSelected ? '#ffffff' : game.color}
          emissive={hovered ? game.color : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
          roughness={0.3}
          metalness={0.7}
        />
        
        {/* Borda superior do cartucho */}
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[1.1, 0.1, 0.4]} />
          <meshStandardMaterial 
            color={game.accentColor}
            emissive={hovered ? game.accentColor : '#000000'}
            emissiveIntensity={hovered ? 0.2 : 0}
          />
        </mesh>
      </mesh>

      {/* Texto do nome do jogo */}
      <Text
        position={[position[0], position[1] - 1, position[2] + 0.5]}
        fontSize={0.15}
        color={game.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {game.name}
      </Text>

      {/* Efeito de brilho quando hover */}
      {hovered && (
        <pointLight
          position={[position[0], position[1], position[2] + 1]}
          color={game.color}
          intensity={1}
          distance={3}
        />
      )}
    </group>
  );
};

export default GameCartridge;
