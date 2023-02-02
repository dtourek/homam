export interface ILocation {
  x: number;
  y: number;
}

export type IInitMapFieldType = 'M' | 'G' | 'D';

interface IInitMap {
  maxSize: number;
  fieldSize: number;
  fields: IInitMapFieldType[][];
}

export interface IInitStore {
  map: IInitMap;
  player: { hero: { id: number; name: string; location: ILocation } };
  cursor: { location: ILocation };
}

export enum FieldType {
  mountain = 'mountain',
  grass = 'grass',
  desert = 'desert',
}

export interface IField {
  type: FieldType;
  weight: number;
  color: string;
  x: number;
  y: number;
}

interface IMap {
  maxSize: number;
  fieldSize: number;
  fields: IField[];
}

export interface IGameStore {
  map: IMap;
  player: { hero: { id: number; name: string; location: ILocation } };
  cursor: { location: ILocation };
}
