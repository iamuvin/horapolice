export const GAME_CONFIG = {
  characterSize: 40,
  coconutRadius: 15,
  policeSpeed: {
    easy: 3,
    medium: 4,
    hard: 5
  },
  thiefSpeed: {
    easy: 2,
    medium: 3,
    hard: 4
  },
  coconutCount: {
    easy: 5,
    medium: 8,
    hard: 12
  },
  thiefCount: {
    easy: 1,
    medium: 2,
    hard: 3
  }
} as const;