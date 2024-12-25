import React from 'react';
import { GameMode } from '../types';

interface GameControlsProps {
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  isPlaying: boolean;
  startGame: () => void;
  resetGame: () => void;
}

export function GameControls({
  gameMode,
  setGameMode,
  isPlaying,
  startGame,
  resetGame,
}: GameControlsProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <select
        value={gameMode}
        onChange={(e) => setGameMode(e.target.value as GameMode)}
        className="bg-white/10 border border-white/20 rounded-lg px-4 py-2"
        disabled={isPlaying}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button
        onClick={isPlaying ? resetGame : startGame}
        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition-colors"
      >
        {isPlaying ? 'Reset Game' : 'Start Game'}
      </button>
    </div>
  );
}