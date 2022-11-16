import { IMapResource } from '../resources/interfaces';

export enum FieldType {
  water = 'water',
  mountain = 'mountain',
  forest = 'forest',
  grass = 'grass',
  mud = 'mud',
  swamp = 'swamp',
  desert = 'desert',
}

export interface IField {
  type: FieldType;
  resource?: IMapResource;
}

export type WorldMap = IField[][];
