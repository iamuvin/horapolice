import { Position } from '../types';
import { GAME_CONFIG } from './config';

export function drawCharacter(
  ctx: CanvasRenderingContext2D,
  pos: Position,
  type: 'police' | 'thief'
) {
  const size = GAME_CONFIG.characterSize;
  
  // Body
  ctx.fillStyle = type === 'police' ? '#0047ab' : '#333333';
  ctx.fillRect(pos.x - size/2, pos.y - size/2, size, size);
  
  // Head
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(pos.x, pos.y - size/2, size/3, 0, Math.PI * 2);
  ctx.fill();
  
  if (type === 'police') {
    drawPoliceHat(ctx, pos, size);
  } else {
    drawThiefMask(ctx, pos, size);
  }
}

function drawPoliceHat(ctx: CanvasRenderingContext2D, pos: Position, size: number) {
  ctx.fillStyle = '#000080';
  ctx.beginPath();
  ctx.moveTo(pos.x - size/3, pos.y - size/1.5);
  ctx.lineTo(pos.x + size/3, pos.y - size/1.5);
  ctx.lineTo(pos.x, pos.y - size);
  ctx.closePath();
  ctx.fill();
}

function drawThiefMask(ctx: CanvasRenderingContext2D, pos: Position, size: number) {
  ctx.fillStyle = '#000000';
  ctx.fillRect(pos.x - size/3, pos.y - size/1.8, size/1.5, size/4);
}