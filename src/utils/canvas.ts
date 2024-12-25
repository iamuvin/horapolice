import { Position } from '../types';
import { drawCharacter } from './characters';
import { GAME_CONFIG } from './config';

export function drawGame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  police: Position,
  thieves: Position[],
  coconuts: Position[]
) {
  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw background
  drawBackground(ctx, width, height);
  
  // Draw game elements
  coconuts.forEach(pos => drawCoconut(ctx, pos));
  thieves.forEach(pos => drawCharacter(ctx, pos, 'thief'));
  drawCharacter(ctx, police, 'police');
}

function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = '#1a4d1c'; // Dark green background
  ctx.fillRect(0, 0, width, height);
  
  // Draw some simple trees
  for (let i = 0; i < 5; i++) {
    const x = (width / 6) * (i + 1);
    const y = height - 100;
    drawTree(ctx, x, y);
  }
}

function drawTree(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Tree trunk
  ctx.fillStyle = '#4d2600';
  ctx.fillRect(x - 10, y, 20, 100);
  
  // Tree leaves
  ctx.fillStyle = '#2d5a27';
  ctx.beginPath();
  ctx.moveTo(x - 30, y);
  ctx.lineTo(x + 30, y);
  ctx.lineTo(x, y - 50);
  ctx.closePath();
  ctx.fill();
}

function drawCoconut(ctx: CanvasRenderingContext2D, pos: Position) {
  ctx.fillStyle = '#654321';
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, GAME_CONFIG.coconutRadius, 0, Math.PI * 2);
  ctx.fill();
}