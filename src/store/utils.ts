import {IField, ILocation, IPlayer} from "../interfaces";

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
export const isPlayerField = (location: ILocation, player: IPlayer): boolean => location.x === player.location.x && location.y === player.location.y
export const isPathField = (path: ILocation[], x: number, y: number): boolean => path.findIndex((p) => p.x === x && p.y === y) >= 0
