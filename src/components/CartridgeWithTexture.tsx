import React from 'react';
import { useTexture } from '@react-three/drei';
import { Game } from '../data/games';

interface CartridgeWithTextureProps {
  game: Game;
  isSelected: boolean;
  hovered: boolean;
}

// Componente que só é usado quando há textura
const TexturedCartridge: React.FC<CartridgeWithTextureProps> = ({ 
  game, 
  isSelected, 
  hovered 
}) => {
  const texture = useTexture(game.cartridgeImage!); // ! porque só chamamos quando há imagem
  
  return (
    <>
      <boxGeometry args={[1, 1.5, 0.3]} />
      <meshStandardMaterial 
        map={texture}
        color={'#ffffff'}
        emissive={hovered ? '#ffffff' : '#000000'}
        emissiveIntensity={hovered ? 0.1 : 0}
        roughness={0.3}
        metalness={0.7}
      />
    </>
  );
};

// Componente simples sem textura
const SimpleCartridge: React.FC<CartridgeWithTextureProps> = ({ 
  game, 
  isSelected, 
  hovered 
}) => {
  return (
    <>
      <boxGeometry args={[1, 1.5, 0.3]} />
      <meshStandardMaterial 
        color={isSelected ? '#ffffff' : game.color}
        emissive={hovered ? '#ffffff' : '#000000'}
        emissiveIntensity={hovered ? 0.1 : 0}
        roughness={0.3}
        metalness={0.7}
      />
    </>
  );
};

// Componente principal que decide qual usar
const CartridgeWithTexture: React.FC<CartridgeWithTextureProps> = ({ 
  game, 
  isSelected, 
  hovered 
}) => {
  // Se há imagem, usa TexturedCartridge, senão usa SimpleCartridge
  if (game.cartridgeImage) {
    return <TexturedCartridge game={game} isSelected={isSelected} hovered={hovered} />;
  }
  
  return <SimpleCartridge game={game} isSelected={isSelected} hovered={hovered} />;
};

export default CartridgeWithTexture;
