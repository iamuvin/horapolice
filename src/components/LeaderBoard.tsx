import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { ScoreEntry } from '../types';
import { getStoredScores, saveNewScore } from '../utils/leaderboard';

interface LeaderBoardProps {
  score: number;
  isGameOver: boolean;
  playerName: string;
}

export function LeaderBoard({ score, isGameOver, playerName }: LeaderBoardProps) {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  // Load initial scores
  useEffect(() => {
    setScores(getStoredScores());
  }, []);

  // Handle new score
  useEffect(() => {
    if (isGameOver && score > 0) {
      const newScore: ScoreEntry = {
        name: playerName,
        score,
        date: new Date().toLocaleDateString()
      };

      setScores(currentScores => saveNewScore(currentScores, newScore));
    }
  }, [isGameOver, score, playerName]);

  return (
    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-yellow-500" size={24} />
        <h2 className="text-xl font-bold">Leaderboard</h2>
      </div>

      <div className="space-y-3">
        {scores.map((entry, index) => (
          <div
            key={`${entry.name}-${entry.date}-${entry.score}`}
            className={`flex justify-between items-center p-3 rounded ${
              entry.name === playerName ? 'bg-blue-500/20' : 'bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold">{index + 1}</span>
              <span className="font-medium">{entry.name}</span>
            </div>
            <div className="text-sm opacity-75">
              <span className="mr-2">{entry.score}</span>
              <span>{entry.date}</span>
            </div>
          </div>
        ))}
        {scores.length === 0 && (
          <p className="text-center text-white/50">No scores yet</p>
        )}
      </div>
    </div>
  );
}