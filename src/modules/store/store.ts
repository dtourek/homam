import { initialGameStore } from 'homam/init';
import { toGameStore } from 'homam/modules/store/toGameStore';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'homam/store';

export const gameSlice = createSlice({
  name: 'game',
  initialState: toGameStore(initialGameStore),
  reducers: {
    heroMove: (state, action) => {
      const [head, ...fields] = state.player.hero.path.fields;
      return {
        ...state,
        player: {
          ...state.player,
          hero: { ...state.player.hero, location: action.payload, path: { ...state.player.hero.path, fields } },
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
      return { ...state, player: { ...state.player, hero: { ...state.player.hero, path: action.payload } } };
    },
  },
});

export const { heroMove, heroMoveStart, cursorMove, heroMoveEnd, heroPath } = gameSlice.actions;

export const pathSelector = (store: RootState) => store.game.player.hero.path;
export const moveToSelector = (store: RootState) => store.game.player.hero.moveTo;
