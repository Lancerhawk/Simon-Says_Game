import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export type GameDifficulty = 'easy' | 'medium' | 'hard' | 'nonstop';
export type GameStatus = 'idle' | 'showing' | 'waiting' | 'paused' | 'gameover';

export interface GameState {
  sequence: number[];
  playerSequence: number[];
  currentStep: number;
  level: number;
  score: number;
  status: GameStatus;
  difficulty: GameDifficulty;
  speed: number;
  isPlaying: boolean;
  highScores: Record<GameDifficulty, number>;
}

type GameAction =
  | { type: 'START_GAME'; difficulty: GameDifficulty }
  | { type: 'ADD_TO_SEQUENCE' }
  | { type: 'PLAYER_INPUT'; buttonId: number }
  | { type: 'NEXT_LEVEL' }
  | { type: 'GAME_OVER' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'RESTART_GAME' }
  | { type: 'SET_STATUS'; status: GameStatus }
  | { type: 'RESET_PLAYER_SEQUENCE' }
  | { type: 'UPDATE_HIGH_SCORE' };

const initialState: GameState = {
  sequence: [],
  playerSequence: [],
  currentStep: 0,
  level: 1,
  score: 0,
  status: 'idle',
  difficulty: 'easy',
  speed: 1000,
  isPlaying: false,
  highScores: {
    easy: 0,
    medium: 0,
    hard: 0,
    nonstop: 0
  }
};

const getDifficultySpeed = (difficulty: GameDifficulty, level: number): number => {
  const baseSpeed = {
    easy: 1200,
    medium: 800,
    hard: 500,
    nonstop: 600
  };
  
  if (difficulty === 'nonstop') {
    return Math.max(200, baseSpeed[difficulty] - (level * 20));
  }
  
  return baseSpeed[difficulty];
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      const newSequence = [Math.floor(Math.random() * 4)];
      return {
        ...state,
        difficulty: action.difficulty,
        sequence: newSequence,
        playerSequence: [],
        currentStep: 0,
        level: 1,
        score: 0,
        status: 'showing',
        speed: getDifficultySpeed(action.difficulty, 1),
        isPlaying: true
      };

    case 'ADD_TO_SEQUENCE':
      const nextButton = Math.floor(Math.random() * 4);
      const updatedSequence = [...state.sequence, nextButton];
      return {
        ...state,
        sequence: updatedSequence,
        speed: getDifficultySpeed(state.difficulty, state.level)
      };

    case 'PLAYER_INPUT':
      const newPlayerSequence = [...state.playerSequence, action.buttonId];
      const isCorrect = newPlayerSequence[newPlayerSequence.length - 1] === 
                       state.sequence[newPlayerSequence.length - 1];
      
      if (!isCorrect) {
        return {
          ...state,
          status: 'gameover',
          isPlaying: false
        };
      }

      if (newPlayerSequence.length === state.sequence.length) {
        return {
          ...state,
          playerSequence: [],
          currentStep: 0,
          level: state.level + 1,
          score: state.score + (state.level * 10),
          status: 'showing'
        };
      }

      return {
        ...state,
        playerSequence: newPlayerSequence,
        currentStep: newPlayerSequence.length
      };

    case 'NEXT_LEVEL':
      return {
        ...state,
        level: state.level + 1,
        score: state.score + (state.level * 10)
      };

    case 'GAME_OVER':
      const newHighScore = Math.max(state.score, state.highScores[state.difficulty]);
      return {
        ...state,
        status: 'gameover',
        isPlaying: false,
        highScores: {
          ...state.highScores,
          [state.difficulty]: newHighScore
        }
      };

    case 'PAUSE_GAME':
      return {
        ...state,
        status: 'paused'
      };

    case 'RESUME_GAME':
      return {
        ...state,
        status: 'waiting'
      };

    case 'RESTART_GAME':
      const restartSequence = [Math.floor(Math.random() * 4)];
      return {
        ...state,
        sequence: restartSequence,
        playerSequence: [],
        currentStep: 0,
        level: 1,
        score: 0,
        status: 'showing',
        speed: getDifficultySpeed(state.difficulty, 1)
      };

    case 'SET_STATUS':
      return {
        ...state,
        status: action.status
      };

    case 'RESET_PLAYER_SEQUENCE':
      return {
        ...state,
        playerSequence: [],
        currentStep: 0
      };

    case 'UPDATE_HIGH_SCORE':
      const updatedHighScore = Math.max(state.score, state.highScores[state.difficulty]);
      return {
        ...state,
        highScores: {
          ...state.highScores,
          [state.difficulty]: updatedHighScore
        }
      };

    default:
      return state;
  }
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};