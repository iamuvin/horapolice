export type GameMode = 'easy' | 'medium' | 'hard';

export interface Position {
  x: number;
  y: number;
}

export interface ScoreEntry {
  name: string;
  score: number;
  date: string;
}