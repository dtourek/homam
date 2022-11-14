import { IResources } from '../resources/interfaces';

export interface IPlayer {
  remainingMovement: number;
  location: ILocation;
  resources: IResources;
}

export interface ILocation {
  x: number;
  y: number;
}
