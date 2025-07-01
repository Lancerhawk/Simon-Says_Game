import React from 'react';
import './PauseMenu.css';

interface PauseMenuProps {
  onResume: () => void;
  onRestart: () => void;
  onBackToMenu: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({
  onResume,
  onRestart,
  onBackToMenu
}) => {
  return (
    <div className="pause-menu-overlay">
      <div className="pause-menu">
        <div className="pause-header">
          <div className="pause-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          </div>
          <h2 className="pause-title">Game Paused</h2>
          <p className="pause-subtitle">Take a breather!</p>
        </div>

        <div className="pause-menu-buttons">
          <button onClick={onResume} className="menu-btn resume-btn">
            <div className="btn-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <span className="btn-text">Resume Game</span>
          </button>

          <button onClick={onRestart} className="menu-btn restart-btn">
            <div className="btn-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
            </div>
            <span className="btn-text">Restart Game</span>
          </button>

          <button onClick={onBackToMenu} className="menu-btn menu-btn-secondary">
            <div className="btn-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
            <span className="btn-text">Back to Menu</span>
          </button>
        </div>

        <div className="pause-tips">
          <div className="tip-item">
            <span className="tip-icon">💡</span>
            <span className="tip-text">Take your time to memorize the pattern</span>
          </div>
          <div className="tip-item">
            <span className="tip-icon">🎯</span>
            <span className="tip-text">Focus on the sequence order, not speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PauseMenu;