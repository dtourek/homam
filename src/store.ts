import { IField, isObstacleField } from './map/field';
import { ILocation, IPlayer } from './types';

export type WorldMap = IField[][];

export interface Store {
  getMap: () => WorldMap;
  getPlayer: () => IPlayer;
  updatePlayerLocation: (location: ILocation) => IPlayer;
}

export const getStore = (initWorldMap: WorldMap, initPlayer: IPlayer): Store => {
  const map: WorldMap = initWorldMap;
  let player = initPlayer;

  const updatePlayerLocation = (location: ILocation): IPlayer => ({ ...player, location });

  const getField = (location: ILocation): IField | undefined => map.find((row, y) => location.y === y)?.find((row, x) => location.x === x);

  return {
    getMap: () => map,
    getPlayer: () => player,
    updatePlayerLocation: (location) => {
      const field = getField(location);

      if (field && !isObstacleField(field)) {
        player = updatePlayerLocation(location);
      }
      return player;
    },
  };
};
