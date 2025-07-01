import React from 'react';
import './GameBoard.css';

interface GameBoardProps {
  onButtonClick: (buttonId: number) => void;
  activeButton: number | null;
  disabled: boolean;
  playerSequence: number[];
  showingSequence: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  onButtonClick,
  activeButton,
  disabled,
  playerSequence,
  showingSequence
}) => {
  const buttonColors = [
    { id: 0, color: 'red', name: 'Red' },
    { id: 1, color: 'blue', name: 'Blue' },
    { id: 2, color: 'green', name: 'Green' },
    { id: 3, color: 'yellow', name: 'Yellow' }
  ];

  const handleButtonClick = (buttonId: number) => {
    if (disabled) return;
    onButtonClick(buttonId);
  };

  const isButtonInPlayerSequence = (buttonId: number) => {
    return playerSequence.includes(buttonId);
  };

  const getButtonLastClickIndex = (buttonId: number) => {
    return playerSequence.lastIndexOf(buttonId);
  };

  return (
    <div className="game-board">
      <div className="game-board-container">
        {buttonColors.map((button) => {
          const isActive = activeButton === button.id;
          const isInSequence = isButtonInPlayerSequence(button.id);
          const lastClickIndex = getButtonLastClickIndex(button.id);
          const isRecentClick = lastClickIndex === playerSequence.length - 1 && !showingSequence;

          return (
            <button
              key={button.id}
              className={`
                game-button 
                ${button.color}-button
                ${isActive ? 'active' : ''}
                ${disabled ? 'disabled' : ''}
                ${isInSequence ? 'in-sequence' : ''}
                ${isRecentClick ? 'recent-click' : ''}
              `}
              onClick={() => handleButtonClick(button.id)}
              disabled={disabled}
              aria-label={button.name}
            >
              <div className="button-inner">
                <div className="button-glow"></div>
                <div className="button-content">
                  <span className="button-number">{button.id + 1}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Center logo/indicator */}
      <div className="center-indicator">
        <div className="simon-logo">
          <span className="logo-text">SIMON</span>
          <div className="logo-ring"></div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;