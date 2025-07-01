import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import InstructionsPage from './pages/InstructionsPage';
import { GameProvider } from './context/GameContext';
import './App.css';

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/instructions" element={<InstructionsPage />} />
            <Route path="/game/:difficulty" element={<GamePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GameProvider>
  );
};

export default App;