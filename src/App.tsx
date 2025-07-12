import React, { useState, useEffect } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Mesh, BoxGeometry, MeshStandardMaterial, Group, AmbientLight, DirectionalLight, PointLight, GridHelper, CylinderGeometry, SpotLight } from 'three';
import GameCartridge from './components/GameCartridge';
import Console from './components/Console';
import GameCard from './components/GameCard';
import CameraToggle from './components/CameraToggle';
import AnimatedCamera from './components/AnimatedCamera';
import VolumeControl from './components/VolumeControl';
import AudioManager from './utils/AudioManager';
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
  GridHelper,
  CylinderGeometry,
  SpotLight
});

function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [cameraFollowEnabled, setCameraFollowEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioManager = AudioManager.getInstance();

  useEffect(() => {
    // Inicializar áudio quando o componente monta
    audioManager.setVolume(volume);
    audioManager.startBackgroundMusic();

    return () => {
      // Cleanup quando componente desmonta
      audioManager.stopBackgroundMusic();
    };
  }, [audioManager, volume]);

  useEffect(() => {
    // Atualizar volume quando mudado
    audioManager.setVolume(volume);
  }, [audioManager, volume]);

  const handleCartridgeClick = (game: Game) => {
    setSelectedGame(game);
    setShowCard(false); // Reset card visibility
    setIsAnimating(true); // Ativar animação
    // Tocar som de inserção do cartucho
    audioManager.playSound('start');
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

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  return (
    <div className="app">
      {/* Header retrô */}
      <div className="app-header">
        <h1 className="retro-title neon-glow">3D FUN</h1>
        <p className="retro-subtitle">RETRO GAMING LIBRARY</p>
      </div>

      {/* Controles UI */}
      <CameraToggle 
        isEnabled={cameraFollowEnabled}
        onToggle={handleCameraToggle}
      />
      
      <VolumeControl 
        volume={volume}
        onVolumeChange={handleVolumeChange}
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
        
        {/* Luzes ambiente melhoradas */}
        <ambientLight intensity={0.2} color="#1a0033" />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
        
        {/* Luz ambiente azul/roxa para volume */}
        <ambientLight intensity={0.1} color="#4400ff" />
        
        {/* Luzes neon para ambiente retrô - mais intensas */}
        <pointLight position={[-5, 5, 5]} color="#ff00ff" intensity={1.5} distance={8} />
        <pointLight position={[5, 5, 5]} color="#00ffff" intensity={1.5} distance={8} />
        <pointLight position={[0, -2, 5]} color="#39ff14" intensity={0.8} distance={6} />
        
        {/* Luzes adicionais para criar mais atmosfera */}
        <pointLight position={[-3, 1, -2]} color="#ff6600" intensity={0.6} distance={4} />
        <pointLight position={[3, 1, -2]} color="#6600ff" intensity={0.6} distance={4} />

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

        {/* Grid de fundo retrô com glow */}
        <gridHelper 
          args={[20, 20]} 
          position={[0, -3, 0]} 
          color1="#00ffff"
          color2="#ff00ff"
        />
        
        {/* Grid adicional para efeito neon */}
        <gridHelper 
          args={[40, 40]} 
          position={[0, -3.01, 0]} 
          color1="rgba(57, 255, 20, 0.3)"
          color2="rgba(255, 102, 0, 0.3)"
        />
        
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
