export interface ILocation {
  x: number;
  y: number;
}

export type IInitMapFieldType = 'M' | 'G' | 'D';

interface IInitMap {
  fieldSize: number;
  fields: IInitMapFieldType[][];
  resources: IResource[];
}

export interface IInitStore {
  map: IInitMap;
  player: { hero: IHero };
  cursor: { location: ILocation };
}

export enum FieldType {
  mountain = 'mountain',
  grass = 'grass',
  desert = 'desert',
}

export interface IField {
  type: FieldType;
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
  path: IPath;
  moveTo?: ILocation;
  stepsLeft: number;
  isMoving: boolean;
}

interface IMap {
  fieldSize: number;
  fields: IField[][];
  resources: IResource[];
}

export interface IGameStore {
  map: IMap;
  turn: number;
  player: { hero: IHero };
  cursor: { location: ILocation };
}

export interface IResource {
  location: ILocation;
  type: ResourceType;
  amount: number;
}

export enum ResourceType {
  gold = 'gold',
  rock = 'rock',
  wood = 'wood',
}
