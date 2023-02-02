import { ILocation } from '../player/interfaces';
import { IField } from '../map/field/interfaces';

export enum ResourceType {
  gold = 'gold',
  rock = 'rock',
  wood = 'wood',
}

export interface IPlayerResources {
  [ResourceType.gold]: number;
  [ResourceType.rock]: number;
  [ResourceType.wood]: number;
}

export interface IMapResource {
  type: ResourceType;
  amount: number;
}

export interface IResourceField extends IField {
  location: ILocation;
}
