import React from 'react';
import './GameOverModal.css';

interface GameOverModalProps {
  score: number;
  level: number;
  highScore: number;
  difficulty: string;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  level,
  highScore,
  difficulty,
  onPlayAgain,
  onBackToMenu
}) => {
  const isNewHighScore = score > 0 && score === highScore;
  
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'hard': return '#f44336';
      case 'nonstop': return '#9c27b0';
      default: return '#667eea';
    }
  };

  const getPerformanceMessage = () => {
    if (level <= 3) return "Good start! Keep practicing!";
    if (level <= 7) return "Nice job! You're getting better!";
    if (level <= 12) return "Excellent memory skills!";
    if (level <= 20) return "Outstanding performance!";
    return "Incredible! You're a Simon master!";
  };

  return (
    <div className="game-over-overlay">
      <div className="game-over-modal" style={{ '--difficulty-color': getDifficultyColor(difficulty) } as React.CSSProperties}>
        <div className="modal-header">
          <div className="game-over-icon">
            {isNewHighScore ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            )}
          </div>
          
          <h2 className="game-over-title">
            {isNewHighScore ? 'New High Score!' : 'Game Over'}
          </h2>
          
          <p className="performance-message">
            {getPerformanceMessage()}
          </p>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <span className="stat-label">Level Reached</span>
              <span className="stat-value">{level}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <span className="stat-label">Final Score</span>
              <span className="stat-value">{score}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <span className="stat-label">High Score</span>
              <span className="stat-value">{highScore}</span>
            </div>
          </div>

          <div className="stat-card difficulty-card">
            <div className="stat-icon">🎮</div>
            <div className="stat-info">
              <span className="stat-label">Difficulty</span>
              <span className="stat-value difficulty-value">
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="achievements-section">
          <h3 className="achievements-title">Achievements</h3>
          <div className="achievements-grid">
            <div className={`achievement ${level >= 5 ? 'unlocked' : 'locked'}`}>
              <span className="achievement-icon">🥉</span>
              <span className="achievement-name">Level 5</span>
            </div>
            <div className={`achievement ${level >= 10 ? 'unlocked' : 'locked'}`}>
              <span className="achievement-icon">🥈</span>
              <span className="achievement-name">Level 10</span>
            </div>
            <div className={`achievement ${level >= 15 ? 'unlocked' : 'locked'}`}>
              <span className="achievement-icon">🥇</span>
              <span className="achievement-name">Level 15</span>
            </div>
            <div className={`achievement ${level >= 20 ? 'unlocked' : 'locked'}`}>
              <span className="achievement-icon">👑</span>
              <span className="achievement-name">Master</span>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onPlayAgain} className="action-btn primary-btn">
            <div className="btn-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <span className="btn-text">Play Again</span>
          </button>

          <button onClick={onBackToMenu} className="action-btn secondary-btn">
            <div className="btn-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
            <span className="btn-text">Main Menu</span>
          </button>
        </div>

        {isNewHighScore && (
          <div className="confetti">
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
            <div className="confetti-piece"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameOverModal;