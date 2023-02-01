import {createContext} from "react";
import {initMapFields} from "homam/seed/init";
import {IMapField} from "homam/modules/field/interfaces";

export interface IMapStore {
  maxSize: number;
  fields: IMapField[][];
  fieldSize: number;
}

export const defaultConfigValue = { fields: initMapFields, fieldSize: 20, maxSize: 1000 }

enum Type {
  read = 'read',
}

export interface IAction {
  type: Type;
  payload: number;
}

export const mapReducer = (state: IMapStore, action: IAction) => {
  switch (action.type) {
    case Type.read:
    default:
      return state;
  }
};

export const MapContext = createContext<IMapStore>(defaultConfigValue);
export const MapDispatch = createContext((_value: IAction) => {});
