import {createContext} from "react";
import {initialGameStore} from "homam/init";

export interface ILocation { x: number; y: number }
type MapFieldType = 'M' | 'G' | 'D'

interface IMap {
  maxSize: number;
  tileSize: number;
  tiles: MapFieldType[][];
}

export interface IGameStore {
  map: IMap;
  player: { hero: { id: number, name: string, location: ILocation }};
  cursor: { location: ILocation }
}

enum GameStoreActions {
  heroMove = 'hero-move',
  cursorMove = 'cursor-move'
}

interface IHeroMoveAction {
  type: GameStoreActions.heroMove;
  location: ILocation;
}

interface ICursorMoveAction {
  type: GameStoreActions.cursorMove;
  location: ILocation;
}

type IGameStoreAction = IHeroMoveAction | ICursorMoveAction;

export const heroMoveAction = (location: ILocation): IHeroMoveAction => ({ type: GameStoreActions.heroMove, location })
export const cursorMoveAction = (location: ILocation): ICursorMoveAction => ({ type: GameStoreActions.cursorMove, location })

export const gameStoreReducer = (state: IGameStore, action: IGameStoreAction): IGameStore => {
  switch (action.type) {
    case GameStoreActions.heroMove:
      console.log(action)
      return {...state, player: { ...state.player, hero: { ...state.player.hero, location: action.location }} }
    case GameStoreActions.cursorMove:
      return {...state, cursor: { location: action.location }}
    default:
      return state
  }
}

export const GameStore = createContext<IGameStore>(initialGameStore)
export const GameDispatch = createContext((_value: IGameStoreAction) => {})
