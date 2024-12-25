import React from 'react';
import { Trophy, XCircle } from 'lucide-react';

interface GameOverModalProps {
  score: number;
  playerName: string;
  onPlayAgain: () => void;
}

export function GameOverModal({ score, playerName, onPlayAgain }: GameOverModalProps) {
  const isWinner = score > 500;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 p-8 rounded-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          {isWinner ? (
            <div className="bg-yellow-500 p-4 rounded-full">
              <Trophy size={32} />
            </div>
          ) : (
            <div className="bg-red-500 p-4 rounded-full">
              <XCircle size={32} />
            </div>
          )}
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {isWinner ? "අල්ලයි මගේ නැට්ට!" : "ටෝව දානවා අටපට්ටමට!"}
        </h2>
        <p className="text-xl mb-4">{playerName}'s Score: {score}</p>
        <button
          onClick={onPlayAgain}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors font-semibold"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}