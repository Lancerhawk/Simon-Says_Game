import React, { useEffect, useCallback, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import GameBoard from '../components/GameBoard';
import GameControls from '../components/GameControls';
import PauseMenu from '../components/PauseMenu';
import GameOverModal from '../components/GameOverModal';
import './GamePage.css';

const GamePage: React.FC = () => {
  const { difficulty } = useParams<{ difficulty: string }>();
  const { state, dispatch } = useGame();
  const [showingSequence, setShowingSequence] = useState(false);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const playSequence = useCallback(async () => {
    if (state.sequence.length === 0) return;
    
    setShowingSequence(true);
    setCurrentSequenceIndex(0);
    dispatch({ type: 'SET_STATUS', status: 'showing' });

    for (let i = 0; i < state.sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setActiveButton(state.sequence[i]);
      setCurrentSequenceIndex(i);
      
      await new Promise(resolve => setTimeout(resolve, state.speed));
      setActiveButton(null);
      
      if (i < state.sequence.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    setShowingSequence(false);
    dispatch({ type: 'SET_STATUS', status: 'waiting' });
  }, [state.sequence, state.speed, dispatch]);

  const handleButtonClick = (buttonId: number) => {
    if (state.status !== 'waiting' || showingSequence) return;

    dispatch({ type: 'PLAYER_INPUT', buttonId });
  };

  const handlePause = () => {
    dispatch({ type: 'PAUSE_GAME' });
  };

  const handleResume = () => {
    dispatch({ type: 'RESUME_GAME' });
  };

  const handleRestart = () => {
    dispatch({ type: 'RESTART_GAME' });
  };

  const handleNewGame = () => {
    if (difficulty) {
      dispatch({ type: 'START_GAME', difficulty: difficulty as any });
    }
  };

  // Initialize game when component mounts
  useEffect(() => {
    if (difficulty && !state.isPlaying) {
      dispatch({ type: 'START_GAME', difficulty: difficulty as any });
    }
  }, [difficulty, dispatch, state.isPlaying]);

  // Handle sequence progression
  useEffect(() => {
    if (state.status === 'showing' && state.sequence.length > 0) {
      const timer = setTimeout(() => {
        playSequence();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.status, state.sequence.length, playSequence]);

  // Handle level progression
  useEffect(() => {
    if (state.status === 'showing' && state.level > 1) {
      dispatch({ type: 'ADD_TO_SEQUENCE' });
    }
  }, [state.level, state.status, dispatch]);

  // Handle game over
  useEffect(() => {
    if (state.status === 'gameover') {
      dispatch({ type: 'UPDATE_HIGH_SCORE' });
    }
  }, [state.status, dispatch]);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'hard': return '#f44336';
      case 'nonstop': return '#9c27b0';
      default: return '#667eea';
    }
  };

  const getStatusMessage = () => {
    switch (state.status) {
      case 'showing':
        return 'Watch the sequence...';
      case 'waiting':
        return 'Your turn! Click the buttons in order';
      case 'paused':
        return 'Game Paused';
      case 'gameover':
        return 'Game Over!';
      default:
        return 'Get ready...';
    }
  };

  if (!difficulty) {
    return (
      <div className="game-page">
        <div className="error-container">
          <h2>Invalid Game Mode</h2>
          <Link to="/" className="back-home-btn">Back to Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="game-page" style={{ '--difficulty-color': getDifficultyColor(difficulty) } as React.CSSProperties}>
      <div className="game-container">
        <div className="game-header">
          <div className="game-info">
            <h1 className="game-mode-title">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode
            </h1>
            <div className="game-stats">
              <div className="stat-item">
                <span className="stat-label">Level</span>
                <span className="stat-value">{state.level}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Score</span>
                <span className="stat-value">{state.score}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Best</span>
                <span className="stat-value">{state.highScores[difficulty as keyof typeof state.highScores]}</span>
              </div>
            </div>
          </div>
          
          <GameControls
            onPause={handlePause}
            onRestart={handleRestart}
            isPaused={state.status === 'paused'}
            isGameOver={state.status === 'gameover'}
          />
        </div>

        <div className="game-status">
          <div className="status-message">
            {getStatusMessage()}
          </div>
          {showingSequence && (
            <div className="sequence-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${((currentSequenceIndex + 1) / state.sequence.length) * 100}%` 
                  }}
                />
              </div>
              <span className="progress-text">
                {currentSequenceIndex + 1} / {state.sequence.length}
              </span>
            </div>
          )}
        </div>

        <GameBoard
          onButtonClick={handleButtonClick}
          activeButton={activeButton}
          disabled={state.status !== 'waiting' || showingSequence}
          playerSequence={state.playerSequence}
          showingSequence={showingSequence}
        />

        <div className="game-footer">
          <Link to="/" className="back-menu-btn">
            ← Back to Menu
          </Link>
          
          {state.status === 'gameover' && (
            <button onClick={handleNewGame} className="new-game-btn">
              Play Again
            </button>
          )}
        </div>
      </div>

      {state.status === 'paused' && (
        <PauseMenu
          onResume={handleResume}
          onRestart={handleRestart}
          onBackToMenu={() => window.location.href = '/'}
        />
      )}

      {state.status === 'gameover' && (
        <GameOverModal
          score={state.score}
          level={state.level}
          highScore={state.highScores[difficulty as keyof typeof state.highScores]}
          difficulty={difficulty}
          onPlayAgain={handleNewGame}
          onBackToMenu={() => window.location.href = '/'}
        />
      )}

      <div className="game-background">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
    </div>
  );
};

export default GamePage;