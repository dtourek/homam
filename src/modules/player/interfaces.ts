import { IPlayerResources } from '../resources/interfaces';

export interface IPlayer {
  remainingMovement: number;
  location: ILocation;
  resources: IPlayerResources;
}

export interface ILocation {
  x: number;
  y: number;
}
