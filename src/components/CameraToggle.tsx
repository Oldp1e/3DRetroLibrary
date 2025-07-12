import React from 'react';
import './CameraToggle.css';

interface CameraToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const CameraToggle: React.FC<CameraToggleProps> = ({ isEnabled, onToggle }) => {
  return (
    <div className="camera-toggle">
      <div className="toggle-container">
        <span className="toggle-label">Camera Follow</span>
        <button 
          className={`toggle-button ${isEnabled ? 'active' : ''}`}
          onClick={onToggle}
          aria-label="Toggle camera follow mode"
        >
          <div className="toggle-slider">
            <div className="toggle-icon">
              {isEnabled ? '📹' : '📷'}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CameraToggle;
