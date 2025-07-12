import React from 'react';
import './VolumeControl.css';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => {
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    onVolumeChange(newVolume);
  };

  return (
    <div className="volume-control">
      <div className="volume-label">
        <span className="volume-icon">🔊</span>
        <span className="volume-text">VOLUME</span>
      </div>
      <div className="volume-slider-container">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        <div className="volume-percentage">
          {Math.round(volume * 100)}%
        </div>
      </div>
    </div>
  );
};

export default VolumeControl;
