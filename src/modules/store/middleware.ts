import { ILocation } from 'homam/modules/store/interfaces';

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getMovement = (stepSize: number, current: ILocation) => ({
  right: () => ({
    x: current.x + stepSize,
    y: current.y,
  }),
  left: () => ({
    x: current.x - stepSize,
    y: current.y,
  }),
  down: () => ({
    x: current.x,
    y: current.y + stepSize,
  }),
  up: () => ({
    x: current.x,
    y: current.y - stepSize,
  }),
});

export const step = (stepSize: number, current: ILocation, final: ILocation): ILocation => {
  const move = getMovement(stepSize, current);
  if (final.x > current.x) {
    return move.right();
  }

  if (final.x < current.x) {
    return move.left();
  }
  if (final.y > current.y) {
    return move.down();
  }

  if (final.y < current.y) {
    return move.up();
  }

  return current;
};
