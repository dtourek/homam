import { FieldType } from './store/utils';

export interface IConfig {
  unit: number;
  mapMaxSize: number;
  playerMove: number;
  map: WorldMap;
}

export type WorldMap = IField[][];

export interface ILocation {
  x: number;
  y: number;
}

export interface IPlayer {
  remainingMovement: number;
  location: ILocation;
}

export interface IField {
  type: FieldType;
}
