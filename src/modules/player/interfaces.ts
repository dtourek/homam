import { IPlayerResources } from '../resources/interfaces';
import { IArmyUnit } from '../army/interfaces';
import { Race } from '../race/types';

export interface IPlayer {
  id: number;
  isActive: boolean;
  remainingMovement: number;
  location: ILocation;
  resources: IPlayerResources;
  army: IArmyUnit[];
  race: Race;
}

export interface ILocation {
  x: number;
  y: number;
}
