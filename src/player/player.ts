import { ILocation } from '../types';

export interface IPlayer {
  location: ILocation;
}

export const getPlayer = ({ x, y }: ILocation): IPlayer => ({
  location: { x, y },
});
