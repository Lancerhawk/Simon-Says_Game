import React from 'react';
import { Link } from 'react-router-dom';
import './InstructionsPage.css';

const InstructionsPage: React.FC = () => {
  return (
    <div className="instructions-page">
      <div className="instructions-container">
        <div className="header-section">
          <Link to="/" className="back-button">
            ← Back to Menu
          </Link>
          <h1 className="instructions-title">How to Play Simon Says</h1>
        </div>

        <div className="content-sections">
          <div className="section game-overview">
            <h2 className="section-title">Game Overview</h2>
            <p className="section-text">
              Simon Says is a classic memory game where you must repeat increasingly complex 
              sequences of colors. Watch carefully, listen to the pattern, and replicate it exactly!
            </p>
          </div>

          <div className="section how-to-play">
            <h2 className="section-title">How to Play</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="step-title">Watch the Sequence</h3>
                <p className="step-description">
                  Simon will show you a sequence of colored buttons. Pay close attention 
                  to the order and timing.
                </p>
              </div>
              
              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="step-title">Repeat the Pattern</h3>
                <p className="step-description">
                  Click the buttons in the exact same order that Simon showed you. 
                  Take your time, but be accurate!
                </p>
              </div>
              
              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="step-title">Level Up</h3>
                <p className="step-description">
                  Each successful round adds one more button to the sequence. 
                  The game gets progressively more challenging!
                </p>
              </div>
              
              <div className="step-card">
                <div className="step-number">4</div>
                <h3 className="step-title">Don't Make Mistakes</h3>
                <p className="step-description">
                  One wrong button press ends the game. Challenge yourself to 
                  beat your high score!
                </p>
              </div>
            </div>
          </div>

          <div className="section game-modes">
            <h2 className="section-title">Game Modes</h2>
            <div className="modes-grid">
              <div className="mode-card easy-mode">
                <h3 className="mode-name">Easy Mode</h3>
                <ul className="mode-features">
                  <li>Slower sequence playback</li>
                  <li>Perfect for beginners</li>
                  <li>Generous timing</li>
                </ul>
              </div>
              
              <div className="mode-card medium-mode">
                <h3 className="mode-name">Medium Mode</h3>
                <ul className="mode-features">
                  <li>Standard difficulty</li>
                  <li>Balanced challenge</li>
                  <li>Good for casual play</li>
                </ul>
              </div>
              
              <div className="mode-card hard-mode">
                <h3 className="mode-name">Hard Mode</h3>
                <ul className="mode-features">
                  <li>Fast-paced sequences</li>
                  <li>Quick reflexes needed</li>
                  <li>For experienced players</li>
                </ul>
              </div>
              
              <div className="mode-card nonstop-mode">
                <h3 className="mode-name">Non-Stop Mode</h3>
                <ul className="mode-features">
                  <li>Endless gameplay</li>
                  <li>Speed increases over time</li>
                  <li>Ultimate challenge</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="section tips">
            <h2 className="section-title">Pro Tips</h2>
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">🧠</div>
                <h4 className="tip-title">Use Memory Techniques</h4>
                <p className="tip-text">
                  Create mental patterns or stories to remember longer sequences.
                </p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">👁️</div>
                <h4 className="tip-title">Focus Completely</h4>
                <p className="tip-text">
                  Eliminate distractions and give your full attention to the sequence.
                </p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🎯</div>
                <h4 className="tip-title">Stay Calm</h4>
                <p className="tip-text">
                  Don't rush! Take your time to recall the sequence accurately.
                </p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🏆</div>
                <h4 className="tip-title">Practice Regularly</h4>
                <p className="tip-text">
                  Regular practice improves your memory and pattern recognition.
                </p>
              </div>
            </div>
          </div>

          <div className="section controls">
            <h2 className="section-title">Game Controls</h2>
            <div className="controls-info">
              <div className="control-item">
                <span className="control-key">Click/Tap</span>
                <span className="control-description">Select colored buttons</span>
              </div>
              <div className="control-item">
                <span className="control-key">Pause Button</span>
                <span className="control-description">Pause the game anytime</span>
              </div>
              <div className="control-item">
                <span className="control-key">Restart Button</span>
                <span className="control-description">Start over from level 1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="action-section">
          <Link to="/" className="start-playing-btn">
            Ready to Play!
          </Link>
        </div>
      </div>

      <div className="background-pattern">
        <div className="pattern-circle pattern-red"></div>
        <div className="pattern-circle pattern-blue"></div>
        <div className="pattern-circle pattern-green"></div>
        <div className="pattern-circle pattern-yellow"></div>
      </div>
    </div>
  );
};

export default InstructionsPage;