import { ILocation, IPlayer } from './interfaces';

export const isPlayerField = (location: ILocation, player: IPlayer): boolean => location.x === player.location.x && location.y === player.location.y;
