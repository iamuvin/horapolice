import { ScoreEntry } from '../types';

export function getStoredScores(): ScoreEntry[] {
  const savedScores = localStorage.getItem('leaderboard');
  return savedScores ? JSON.parse(savedScores) : [];
}

export function saveNewScore(scores: ScoreEntry[], newScore: ScoreEntry): ScoreEntry[] {
  const updatedScores = [...scores, newScore]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  localStorage.setItem('leaderboard', JSON.stringify(updatedScores));
  return updatedScores;
}