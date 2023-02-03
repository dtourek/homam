import { IGameStore, ILocation } from 'homam/modules/store/interfaces';
import { GameStoreActions, IGameStoreAction } from 'homam/modules/store/actions';
import { isSameLocation } from 'homam/modules/utils';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

const step = (stepSize: number, current: ILocation, final: ILocation): ILocation => {
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

export const heroMoveMiddleware = async (store: IGameStore, dispatch: (action: IGameStoreAction) => void, position: ILocation, final: ILocation): Promise<void> => {
  const stepSize = store.map.fieldSize;

  // when already moving
  // if (store.player.hero.moveTo) {
  //   return;
  // }

  const newLocation = step(stepSize, position, final);

  dispatch({ type: GameStoreActions.heroMove, location: newLocation });
  if (isSameLocation(final, newLocation)) {
    return dispatch({ type: GameStoreActions.heroMoveEnd });
  }
  await delay(400);
  return heroMoveMiddleware(store, dispatch, newLocation, final);
};
