import { createContext } from 'react';
import { initialGameStore } from 'homam/init';
import { FieldType, IField, IGameStore, IInitMapFieldType, IInitStore, ILocation } from 'homam/modules/store/interfaces';
import { GameStoreActions, IGameStoreAction } from 'homam/modules/store/actions';
import { toGameStore } from 'homam/modules/store/toGameStore';

export const gameStoreReducer = (state: IGameStore, action: IGameStoreAction): IGameStore => {
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
    case GameStoreActions.cursorMove:
      return { ...state, cursor: { location: action.location } };
    default:
      return state;
  }
};

export const defaultGameStore = toGameStore(initialGameStore);
export const GameStore = createContext<IGameStore>(defaultGameStore);
export const GameDispatch = createContext((_value: IGameStoreAction) => {});
