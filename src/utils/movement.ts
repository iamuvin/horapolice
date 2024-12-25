import { Position } from '../types';
import { GAME_CONFIG } from './config';

export function moveTowards(
  current: Position,
  target: Position,
  speed: number
): Position {
  const dx = target.x - current.x;
  const dy = target.y - current.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < speed) {
    return target;
  }
  
  return {
    x: current.x + (dx / distance) * speed,
    y: current.y + (dy / distance) * speed
  };
}

export function getRandomPosition(width: number, height: number): Position {
  const margin = GAME_CONFIG.characterSize;
  return {
    x: margin + Math.random() * (width - 2 * margin),
    y: margin + Math.random() * (height - 2 * margin)
  };
}

export function checkCollision(a: Position, b: Position, radius: number): boolean {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy) < radius * 2;
}