import { IField } from '../interfaces';

export enum FieldType {
  water = 'water',
  mountain = 'mountain',
  forest = 'forest',
  grass = 'grass',
  mud = 'mud',
  swamp = 'swamp',
  desert = 'desert',
}

export const isObstacleField = (field: IField): boolean => field.type === FieldType.water || field.type === FieldType.forest || field.type === FieldType.mountain;
