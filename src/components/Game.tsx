import React, { useState } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { GameMode } from '../types';
import { GameControls } from './GameControls';
import { GameBoard } from './GameBoard';
import { LeaderBoard } from './LeaderBoard';
import { AudioController } from './AudioController';
import { PlayerRegistration } from './PlayerRegistration';
import { GameOverModal } from './GameOverModal';

export function Game() {
  const [isMuted, setIsMuted] = useState(true);
  const [gameMode, setGameMode] = useState<GameMode>('easy');
  const [playerName, setPlayerName] = useState<string>('');
  
  const {
    score,
    isGameOver,
    isPlaying,
    startGame,
    handleMove,
    resetGame,
    gameState
  } = useGameLogic(gameMode);

  const toggleSound = () => setIsMuted(!isMuted);

  const handlePlayAgain = () => {
    resetGame();
  };

  if (!playerName) {
    return <PlayerRegistration onRegister={setPlayerName} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">හොරා පොලිස්</h1>
            <p className="text-white/80">Player: {playerName}</p>
          </div>
          <AudioController isMuted={isMuted} onToggle={toggleSound} />
        </div>

        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <GameBoard 
                isPlaying={isPlaying} 
                onMove={handleMove} 
                gameState={gameState}
              />
            </div>

            <GameControls
              gameMode={gameMode}
              setGameMode={setGameMode}
              isPlaying={isPlaying}
              startGame={startGame}
              resetGame={resetGame}
            />
          </div>

          <LeaderBoard score={score} isGameOver={isGameOver} playerName={playerName} />
        </div>
      </div>

      {isGameOver && (
        <GameOverModal
          score={score}
          playerName={playerName}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}