import { createContext } from 'react';
import { IPlayer } from './interfaces';

export enum PlayerType {
  move = 'move',
}

interface IPlayerMove {
  type: PlayerType.move;
  payload: { id: number; isMoving: boolean };
}

type IPlayerAction = IPlayerMove;

export const PlayerStateContext = createContext<IPlayer[]>([]);
export const PlayerDispatchContext = createContext((_value: IPlayerMove) => {});

const movePlayer = (state: IPlayer[], payload: IPlayerMove['payload']): IPlayer[] => {
  const currentPlayer = state.find((player) => player.id === payload.id);
  if (!currentPlayer) {
    return state;
  }
  return [...state, { ...currentPlayer, isMoving: payload.isMoving }];
};

export const playerReducer = (state: IPlayer[], action: IPlayerAction): IPlayer[] => {
  switch (action.type) {
    case PlayerType.move:
      return movePlayer(state, action.payload);
    default:
      return state;
  }
};
