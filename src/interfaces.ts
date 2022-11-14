import { WorldMap } from './modules/map/interfaces';

export interface IConfig {
  unit: number;
  mapMaxSize: number;
  playerMove: number;
  map: WorldMap;
}
