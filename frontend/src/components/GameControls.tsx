import React from 'react';
import './GameControls.css';

interface GameControlsProps {
  onPause: () => void;
  onRestart: () => void;
  isPaused: boolean;
  isGameOver: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onPause,
  onRestart,
  isPaused,
  isGameOver
}) => {
  return (
    <div className="game-controls">
      {!isGameOver && (
        <button
          onClick={onPause}
          className={`control-btn pause-btn ${isPaused ? 'paused' : ''}`}
          aria-label={isPaused ? 'Resume Game' : 'Pause Game'}
        >
          <div className="btn-icon">
            {isPaused ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            )}
          </div>
          <span className="btn-text">
            {isPaused ? 'Resume' : 'Pause'}
          </span>
        </button>
      )}
      
      <button
        onClick={onRestart}
        className="control-btn restart-btn"
        aria-label="Restart Game"
      >
        <div className="btn-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
        </div>
        <span className="btn-text">Restart</span>
      </button>
    </div>
  );
};

export default GameControls;