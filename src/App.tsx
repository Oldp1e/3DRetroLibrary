import React, { useState } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Mesh, BoxGeometry, MeshStandardMaterial, Group, AmbientLight, DirectionalLight, PointLight, GridHelper } from 'three';
import GameCartridge from './components/GameCartridge';
import Console from './components/Console';
import GameCard from './components/GameCard';
import CameraToggle from './components/CameraToggle';
import AnimatedCamera from './components/AnimatedCamera';
import { gameData, Game } from './data/games';
import './App.css';

// Extend ThreeJS elements for React Three Fiber
extend({ 
  Mesh, 
  BoxGeometry, 
  MeshStandardMaterial, 
  Group, 
  AmbientLight, 
  DirectionalLight, 
  PointLight, 
  GridHelper 
});

function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [cameraFollowEnabled, setCameraFollowEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCartridgeClick = (game: Game) => {
    setSelectedGame(game);
    setShowCard(false); // Reset card visibility
    setIsAnimating(true); // Ativar animação
    // Animar cartucho para o console será feito dentro do GameCartridge
  };

  const handleCardShow = () => {
    setShowCard(true);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  const handleCloseCard = () => {
    setSelectedGame(null);
    setShowCard(false);
    setIsAnimating(false);
  };

  const handleCameraToggle = () => {
    setCameraFollowEnabled(!cameraFollowEnabled);
  };

  return (
    <div className="app">
      {/* Header retrô */}
      <div className="app-header">
        <h1 className="retro-title neon-glow">3D FUN</h1>
        <p className="retro-subtitle">RETRO GAMING LIBRARY</p>
      </div>

      {/* Toggle da câmera */}
      <CameraToggle 
        isEnabled={cameraFollowEnabled}
        onToggle={handleCameraToggle}
      />

      {/* Cena 3D */}
      <Canvas className="canvas-3d">
        {/* Câmera animada ou padrão */}
        {!cameraFollowEnabled && (
          <PerspectiveCamera makeDefault position={[0, 2, 8]} />
        )}
        
        <AnimatedCamera 
          isEnabled={cameraFollowEnabled}
          isAnimating={isAnimating}
        />
        
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Luzes neon para ambiente retrô */}
        <pointLight position={[-5, 5, 5]} color="#ff00ff" intensity={1} />
        <pointLight position={[5, 5, 5]} color="#00ffff" intensity={1} />
        <pointLight position={[0, -2, 5]} color="#39ff14" intensity={0.5} />

        {/* Console no centro-baixo */}
        <Console hasSelectedGame={selectedGame !== null} />

        {/* Cartuchos flutuando */}
        {gameData.map((game, index) => (
          <GameCartridge
            key={game.id}
            game={game}
            position={[
              (index - 2) * 2.5, // Espalhar horizontalmente
              2 + Math.sin(index) * 0.5, // Altura variada
              0
            ]}
            onClick={() => handleCartridgeClick(game)}
            isSelected={selectedGame?.id === game.id}
            onInserted={handleCardShow}
            onAnimationEnd={handleAnimationEnd}
          />
        ))}

        {/* Grid de fundo retrô */}
        <gridHelper args={[20, 20]} position={[0, -3, 0]} />
        
        {/* OrbitControls só quando câmera animada está desabilitada */}
        {!cameraFollowEnabled && (
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={5}
            maxDistance={15}
          />
        )}
      </Canvas>

      {/* Card de informações do jogo */}
      {selectedGame && showCard && (
        <GameCard 
          game={selectedGame} 
          onClose={handleCloseCard}
        />
      )}

      {/* Instruções */}
      <div className="instructions">
        <p className="retro-text">Clique nos cartuchos para descobrir os jogos!</p>
      </div>
    </div>
  );
}

export default App;
