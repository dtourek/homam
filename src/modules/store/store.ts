import { initialGameStore } from 'homam/init';
import { toGameStore } from 'homam/modules/store/toGameStore';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'homam/store';

export const gameSlice = createSlice({
  name: 'game',
  initialState: toGameStore(initialGameStore),
  reducers: {
    heroMove: (state, action) => {
      return {
        ...state,
        player: {
          ...state.player,
          hero: { ...state.player.hero, location: action.payload },
        },
      };
    },
    heroMoveStart: (state, action) => {
      return {
        ...state,
        player: {
          ...state.player,
          hero: { ...state.player.hero, moveTo: action.payload },
        },
      };
    },
    heroMoveEnd: (state) => {
      return {
        ...state,
        player: {
          ...state.player,
          hero: { ...state.player.hero, moveTo: undefined },
        },
      };
    },
    cursorMove: (state, action) => {
      return { ...state, cursor: { location: action.payload } };
    },
    heroPath: (state, action) => {
      return { ...state, player: { ...state.player, hero: { ...state.player.hero, path: action.path } } };
    }
  },
});

export const { heroMove, heroMoveStart, cursorMove, heroMoveEnd } = gameSlice.actions;

export const fieldSizeSelector = (store: RootState) => store.game.map.fieldSize;
export const moveToSelector = (store: RootState) => store.game.player.hero.moveTo;
export const heroLocationSelector = (store: RootState) => store.game.player.hero.location;
