import {createContext} from "react";
import {initMapFields} from "homam/seed/init";
import {IMapField} from "homam/modules/field/interfaces";

export interface IConfig {
  map: { maxSize: number, fields: IMapField[][], fieldSize: number };
}

export const defaultConfigValue = { map: { fields: initMapFields, fieldSize: 20, maxSize: 1000 } }

export const ConfigContext = createContext<IConfig>(defaultConfigValue);
export const ConfigProvider = ConfigContext.Provider
