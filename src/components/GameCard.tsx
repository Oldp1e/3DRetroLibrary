import React, { useEffect, useRef } from 'react';
import { Game } from '../data/games';
import gsap from 'gsap';
import './GameCard.css';

interface GameCardProps {
  game: Game;
  onClose: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animação de entrada do card
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        {
          opacity: 0,
          scale: 0.5,
          rotateY: 180
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
        }
      );
    }
  }, []);

  const handleClose = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        scale: 0.5,
        rotateY: -180,
        duration: 0.5,
        ease: "back.in(1.7)",
        onComplete: onClose
      });
    }
  };

  return (
    <div className="game-card-overlay">
      <div 
        ref={cardRef}
        className="game-card"
        style={{
          borderColor: game.color,
          boxShadow: `0 0 30px ${game.color}, inset 0 0 30px rgba(${hexToRgb(game.color)}, 0.1)`
        }}
      >
        {/* Header do card */}
        <div className="card-header">
          <h2 
            className="game-title"
            style={{ color: game.color, textShadow: `0 0 20px ${game.color}` }}
          >
            {game.name}
          </h2>
          <button 
            className="close-button"
            onClick={handleClose}
            style={{ color: game.accentColor }}
          >
            ✕
          </button>
        </div>

        {/* Informações do jogo */}
        <div className="game-info">
          <div className="info-row">
            <span className="info-label">ANO:</span>
            <span className="info-value" style={{ color: game.accentColor }}>
              {game.year}
            </span>
          </div>
          
          <div className="info-row">
            <span className="info-label">GÊNERO:</span>
            <span className="info-value" style={{ color: game.accentColor }}>
              {game.genre}
            </span>
          </div>
        </div>

        {/* Descrição */}
        <div className="game-description">
          <p>{game.description}</p>
        </div>

        {/* Features */}
        <div className="game-features">
          <h3 style={{ color: game.color }}>CARACTERÍSTICAS:</h3>
          <ul>
            {game.features.map((feature, index) => (
              <li 
                key={index}
                style={{ 
                  borderLeft: `3px solid ${game.accentColor}`,
                  paddingLeft: '10px',
                  marginBottom: '8px'
                }}
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Botão de ação */}
        <div className="card-footer">
          <button 
            className="play-button"
            style={{
              background: `linear-gradient(45deg, ${game.color}, ${game.accentColor})`,
              boxShadow: `0 0 20px ${game.color}`
            }}
          >
            ▶ JOGAR AGORA
          </button>
        </div>

        {/* Efeitos decorativos */}
        <div className="neon-corners">
          <div className="corner top-left" style={{ borderColor: game.color }}></div>
          <div className="corner top-right" style={{ borderColor: game.color }}></div>
          <div className="corner bottom-left" style={{ borderColor: game.accentColor }}></div>
          <div className="corner bottom-right" style={{ borderColor: game.accentColor }}></div>
        </div>
      </div>
    </div>
  );
};

// Função helper para converter hex para rgb
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `${r}, ${g}, ${b}`;
  }
  return '255, 255, 255';
}

export default GameCard;
