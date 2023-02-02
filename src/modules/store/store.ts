import { createContext, Dispatch, useReducer } from 'react';
import { initialGameStore } from 'homam/init';
import { IGameStore } from 'homam/modules/store/interfaces';
import { GameStoreActions, IGameStoreAction } from 'homam/modules/store/actions';
import { toGameStore } from 'homam/modules/store/toGameStore';

const gameStoreReducer = (state: IGameStore, action: IGameStoreAction): IGameStore => {
  switch (action.type) {
    case GameStoreActions.heroMove:
      console.log(action);
      return {
        ...state,
        player: {
          ...state.player,
          hero: { ...state.player.hero, location: action.location },
        },
      };
    case GameStoreActions.heroMoveStart:
      return {
        ...state,
        player: {
          ...state.player,
          hero: { ...state.player.hero, isMoving: true },
        },
      };
    case GameStoreActions.heroMoveEnd:
      return {
        ...state,
        player: {
          ...state.player,
          hero: { ...state.player.hero, isMoving: false },
        },
      };
    case GameStoreActions.cursorMove:
      return { ...state, cursor: { location: action.location } };
    default:
      return state;
  }
};

export const defaultGameStore = toGameStore(initialGameStore);

export const useReducerWithMiddleware = (middlewareFn: (action: IGameStoreAction) => void): [IGameStore, Dispatch<IGameStoreAction>] => {
  const [state, dispatch] = useReducer(gameStoreReducer, defaultGameStore);

  const dispatchWithMiddleware = (action: IGameStoreAction) => {
    middlewareFn(action);
    dispatch(action);
  };

  return [state, dispatchWithMiddleware];
};

export const GameStore = createContext<IGameStore>(defaultGameStore);
export const GameDispatch = createContext((_value: IGameStoreAction) => {});
