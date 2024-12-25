import React, { useEffect, useRef } from 'react';
import { drawGame } from '../utils/canvas';
import { Position } from '../types';

interface GameBoardProps {
  isPlaying: boolean;
  onMove: (direction: { x: number; y: number }) => void;
  gameState: {
    police: Position;
    thieves: Position[];
    coconuts: Position[];
  };
}

export function GameBoard({ isPlaying, onMove, gameState }: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationId: number;

    const animate = () => {
      if (!isPlaying) return;

      // Handle movement based on pressed keys
      const direction = { x: 0, y: 0 };
      if (keysPressed.current.has('ArrowLeft')) direction.x -= 1;
      if (keysPressed.current.has('ArrowRight')) direction.x += 1;
      if (keysPressed.current.has('ArrowUp')) direction.y -= 1;
      if (keysPressed.current.has('ArrowDown')) direction.y += 1;

      if (direction.x !== 0 || direction.y !== 0) {
        onMove(direction);
      }

      // Draw game
      drawGame(
        context,
        canvas.width,
        canvas.height,
        gameState.police,
        gameState.thieves,
        gameState.coconuts
      );

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, onMove, gameState]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full aspect-video bg-black/20 rounded-lg"
      tabIndex={0}
    />
  );
}