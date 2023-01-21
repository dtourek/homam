import { createContext } from 'react';
import { IConfig } from '../../interfaces';
import { initPlayerOne, initPlayerTwo } from '../../init';

enum Type {
  load = 'load',
  read = 'read',
}

export interface IAction {
  type: Type;
  payload: number;
}

export const configReducer = (state: IConfig, action: IAction) => {
  switch (action.type) {
    case Type.read:
    default:
      return state;
  }
};

export const ConfigStateContext = createContext<IConfig>({ map: [[]], mapMaxSize: 0, playerMove: 0, unit: 0, players: [initPlayerOne, initPlayerTwo] });
export const ConfigDispatchContext = createContext((_value: IAction) => {});
