import { ILocation } from 'homam/modules/store/interfaces';
import { GameStoreActions, IGameStoreAction } from 'homam/modules/store/actions';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const heroMoveMiddleware = async (dispatch: (action: IGameStoreAction) => void, position: ILocation, final: ILocation): Promise<void> => {
  const newlocation = { x: position.x + 20, y: position.y + 0 }; // todo;' lepsi cesta k cili
  dispatch({ type: GameStoreActions.heroMove, location: newlocation });
  if (final.x === newlocation.x) {
    return dispatch({ type: GameStoreActions.heroMoveEnd });
  }
  await delay(400);
  return heroMoveMiddleware(dispatch, newlocation, final);
};
