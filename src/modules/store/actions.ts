import { ILocation } from 'homam/modules/store/interfaces';

interface IHeroMoveAction {
  type: GameStoreActions.heroMove;
  location: ILocation;
}

interface ICursorMoveAction {
  type: GameStoreActions.cursorMove;
  location: ILocation;
}

export type IGameStoreAction = IHeroMoveAction | ICursorMoveAction;

export enum GameStoreActions {
  heroMove = 'hero-move',
  cursorMove = 'cursor-move',
}

export const heroMoveAction = (location: ILocation): IHeroMoveAction => ({
  type: GameStoreActions.heroMove,
  location,
});

export const cursorMoveAction = (location: ILocation): ICursorMoveAction => ({
  type: GameStoreActions.cursorMove,
  location,
});
