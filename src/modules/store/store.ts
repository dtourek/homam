import { createContext, Dispatch, useReducer } from "react";
import { initialGameStore } from "homam/init";
import { IGameStore } from "homam/modules/store/interfaces";
import {
  GameStoreActions,
  IGameStoreAction,
} from "homam/modules/store/actions";
import { toGameStore } from "homam/modules/store/toGameStore";

const gameStoreReducer = (
  state: IGameStore,
  action: IGameStoreAction
): IGameStore => {
  // console.log(action);
  switch (action.type) {
    case GameStoreActions.heroMove:
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
          hero: { ...state.player.hero, moveTo: action.location },
        },
      };
    case GameStoreActions.heroMoveEnd:
      return {
        ...state,
        player: {
          ...state.player,
          hero: { ...state.player.hero, moveTo: undefined },
        },
      };
    case GameStoreActions.cursorMove:
      return { ...state, cursor: { location: action.location } };
    default:
      return state;
  }
};

export const defaultGameStore = toGameStore(initialGameStore);

export const useReducerWithMiddleware = (
  middlewareFn: (action: IGameStoreAction) => void
): [IGameStore, Dispatch<IGameStoreAction>] => {
  const [store, dispatch] = useReducer(gameStoreReducer, defaultGameStore);

  const dispatchWithMiddleware = (action: IGameStoreAction) => {
    middlewareFn(action);
    dispatch(action);
  };

  return [store, dispatchWithMiddleware];
};

export const GameStore = createContext<IGameStore>(defaultGameStore);
export const GameDispatch = createContext((_value: IGameStoreAction) => {});
