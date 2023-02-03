import { ILocation, IPath } from 'homam/modules/store/interfaces';

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

interface IHeroPathAction {
  type: GameStoreActions.heroPath;
  path: IPath;
}

export type IGameStoreAction = IHeroMoveAction | ICursorMoveAction | IHeroMoveActionStart | IHeroMoveActionEnd | IHeroPathAction;

export enum GameStoreActions {
  heroMoveEnd = 'hero-move-end',
  heroMoveStart = 'hero-move-start',
  heroMove = 'hero-move',
  heroPath = 'hero-path',
  cursorMove = 'cursor-move',
}

export const cursorMoveAction = (location: ILocation): ICursorMoveAction => ({
  type: GameStoreActions.cursorMove,
  location,
});

export const heroPathAction = (path: IPath): IHeroPathAction => ({
  type: GameStoreActions.heroPath,
  path,
});
