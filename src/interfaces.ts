import { WorldMap } from './modules/map/interfaces';
import { IPlayer } from './modules/player/interfaces';

export interface IConfig {
  unit: number;
  mapMaxSize: number;
  playerMove: number;
  map: WorldMap;
  players: IPlayer[];
}
