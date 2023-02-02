import { ILocation } from 'homam/modules/store/interfaces';

interface IHeroMoveAction {
  type: GameStoreActions.heroMove;
  location: ILocation;
}

interface ICursorMoveAction {
  type: GameStoreActions.cursorMove;
  location: ILocation;
}

interface IHeroMoveActionStart {
  type: GameStoreActions.heroMoveStart;
  location: ILocation;
}

interface IHeroMoveActionEnd {
  type: GameStoreActions.heroMoveEnd;
}

export type IGameStoreAction = IHeroMoveAction | ICursorMoveAction | IHeroMoveActionStart | IHeroMoveActionEnd;

export enum GameStoreActions {
  heroMoveEnd = 'hero-move-end',
  heroMoveStart = 'hero-move-start',
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
