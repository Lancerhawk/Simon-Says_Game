import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { state } = useGame();

  const difficultyDescriptions = {
    easy: 'Relaxed pace, perfect for beginners',
    medium: 'Standard challenge for casual players',
    hard: 'Fast-paced for experienced players',
    nonstop: 'Endless mode - how far can you go?'
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="hero-section">
          <h1 className="game-title">
            <span className="title-simon">Simon</span>
            <span className="title-says">Says</span>
          </h1>
          <p className="game-subtitle">Test your memory with the classic pattern game</p>
          
          <div className="color-preview">
            <div className="preview-button red-preview"></div>
            <div className="preview-button blue-preview"></div>
            <div className="preview-button green-preview"></div>
            <div className="preview-button yellow-preview"></div>
          </div>
        </div>

        <div className="menu-section">
          <h2 className="menu-title">Choose Your Challenge</h2>
          
          <div className="difficulty-grid">
            {Object.entries(difficultyDescriptions).map(([difficulty, description]) => (
              <Link 
                key={difficulty}
                to={`/game/${difficulty}`}
                className={`difficulty-card ${difficulty}-card`}
              >
                <div className="card-content">
                  <h3 className="difficulty-name">
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </h3>
                  <p className="difficulty-description">{description}</p>
                  <div className="high-score">
                    Best: {state.highScores[difficulty as keyof typeof state.highScores]}
                  </div>
                </div>
                <div className="card-glow"></div>
              </Link>
            ))}
          </div>

          <div className="action-buttons">
            <Link to="/instructions" className="instructions-btn">
              <span className="btn-icon">?</span>
              How to Play
            </Link>
          </div>
        </div>
      </div>

      <div className="background-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>
    </div>
  );
};

export default HomePage;