import { Vector2D } from '../types';

export const isEqual = (v1: Vector2D, v2: Vector2D) => {
  return v1.x === v2.x && v1.y === v2.y;
};
