import { useState, useCallback, useRef } from 'react';
import { GameMode, Position } from '../types';
import { GAME_CONFIG } from '../utils/config';
import { moveTowards, getRandomPosition, checkCollision } from '../utils/movement';

export function useGameLogic(gameMode: GameMode) {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const gameStateRef = useRef({
    police: { x: 0, y: 0 },
    thieves: [] as Position[],
    coconuts: [] as Position[],
    targetPositions: [] as Position[],
    lastUpdate: 0
  });

  const startGame = useCallback(() => {
    const initialState = initializeGameState(gameMode);
    gameStateRef.current = initialState;
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  }, [gameMode]);

  const resetGame = useCallback(() => {
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(false);
  }, []);

  const handleMove = useCallback((direction: { x: number; y: number }) => {
    if (!isPlaying || isGameOver) return;

    const state = gameStateRef.current;
    const now = performance.now();
    const deltaTime = now - state.lastUpdate;
    
    // Update police position
    state.police = moveTowards(
      state.police,
      { x: state.police.x + direction.x, y: state.police.y + direction.y },
      GAME_CONFIG.policeSpeed[gameMode]
    );

    // Update thieves
    state.thieves = state.thieves.map((thief, index) => {
      const target = state.targetPositions[index];
      const newPos = moveTowards(thief, target, GAME_CONFIG.thiefSpeed[gameMode]);
      
      // If thief reached target, set new random target
      if (newPos === target) {
        state.targetPositions[index] = getRandomPosition(800, 600);
      }
      
      return newPos;
    });

    // Check collisions
    state.thieves = state.thieves.filter(thief => {
      if (checkCollision(state.police, thief, GAME_CONFIG.characterSize)) {
        setScore(prev => prev + 100);
        return false;
      }
      return true;
    });

    // Check game over
    if (state.thieves.length === 0) {
      setIsGameOver(true);
      setIsPlaying(false);
    }

    state.lastUpdate = now;
  }, [isPlaying, isGameOver, gameMode]);

  return {
    score,
    isGameOver,
    isPlaying,
    startGame,
    handleMove,
    resetGame,
    gameState: gameStateRef.current
  };
}

function initializeGameState(gameMode: GameMode) {
  const thieves: Position[] = [];
  const targetPositions: Position[] = [];
  const coconuts: Position[] = [];

  // Initialize thieves and their targets
  for (let i = 0; i < GAME_CONFIG.thiefCount[gameMode]; i++) {
    thieves.push(getRandomPosition(800, 600));
    targetPositions.push(getRandomPosition(800, 600));
  }

  // Initialize coconuts
  for (let i = 0; i < GAME_CONFIG.coconutCount[gameMode]; i++) {
    coconuts.push(getRandomPosition(800, 600));
  }

  return {
    police: { x: 400, y: 300 },
    thieves,
    coconuts,
    targetPositions,
    lastUpdate: performance.now()
  };
}