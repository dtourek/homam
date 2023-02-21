import { initialGameStore } from 'homam/init';
import { toGameStore } from 'homam/modules/store/utils';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'homam/store';
import { subtractFieldWeight } from 'homam/modules/store/utils';

export const gameSlice = createSlice({
  name: 'game',
  initialState: toGameStore(initialGameStore),
  reducers: {
    heroMove: (state, action) => {
      const [currentField, ...fields] = state.player.hero.path.fields;
      return {
        ...state,
        player: {
          ...state.player,
          hero: {
            ...state.player.hero,
            location: action.payload,
            path: { ...state.player.hero.path, fields },
            stepsLeft: subtractFieldWeight(state.player.hero.stepsLeft, currentField),
          },
        },
      };
    },
    heroMoveStart: (state, action) => {
      return {
        ...state,
        player: {
          ...state.player,
          hero: { ...state.player.hero, moveTo: action.payload, isMoving: true },
        },
      };
    },
    heroMoveEnd: (state) => {
      return {
        ...state,
        player: {
          ...state.player,
          hero: { ...state.player.hero, moveTo: undefined, isMoving: false },
        },
      };
    },
    cursorMove: (state, action) => {
      return { ...state, cursor: { location: action.payload } };
    },
    heroPath: (state, action) => {
      return { ...state, player: { ...state.player, hero: { ...state.player.hero, path: action.payload } } };
    },
    endTurn: (state) => {
      return { ...state, turn: state.turn + 1, player: { ...state.player, hero: { ...state.player.hero, stepsLeft: 5 } } }; // TODO steps based on hero
    },
  },
});

export const { heroMove, heroMoveStart, cursorMove, heroMoveEnd, heroPath, endTurn } = gameSlice.actions;

export const heroSelector = (store: RootState) => store.game.player.hero;
export const moveToSelector = (store: RootState) => store.game.player.hero.moveTo;
