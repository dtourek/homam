export interface ILocation {
  x: number;
  y: number;
}

export type IInitMapFieldType = 'M' | 'G' | 'D';

interface IInitMap {
  fieldSize: number;
  fields: IInitMapFieldType[][];
}

export interface IInitStore {
  map: IInitMap;
  player: { hero: { id: number; name: string; location: ILocation; path: IPath } };
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

export interface IPath {
  fields: IField[];
  weight: number;
}

interface IHero {
  id: number;
  name: string;
  location: ILocation;
  isMoving: boolean;
  path: IPath;
  moveTo?: ILocation;
}

interface IMap {
  fieldSize: number;
  fields: IField[][];
}

export interface IGameStore {
  map: IMap;
  player: { hero: IHero };
  cursor: { location: ILocation };
}
