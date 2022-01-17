import { FieldType, getField, IField, isObstacleField } from './map/field';
import { IPlayer } from './player/player';
import { ILocation } from './types';

export type WorldMap = IField[][];

export interface Store {
  init: () => void;
  getMap: () => WorldMap;
  getPlayer: () => IPlayer;
  updatePlayerLocation: (location: ILocation) => IPlayer;
}

const initWorldMap: WorldMap = [
  [getField(FieldType.water), getField(FieldType.forest), getField(FieldType.mountain), getField(FieldType.grass), getField(FieldType.grass), getField(FieldType.grass)],
  [getField(FieldType.grass), getField(FieldType.grass), getField(FieldType.grass), getField(FieldType.mountain), getField(FieldType.mountain), getField(FieldType.grass)],
  [getField(FieldType.water), getField(FieldType.water), getField(FieldType.mud), getField(FieldType.water), getField(FieldType.mud), getField(FieldType.mud)],
  [getField(FieldType.mountain), getField(FieldType.mud), getField(FieldType.mud), getField(FieldType.water), getField(FieldType.mud), getField(FieldType.water)],
  [getField(FieldType.mud), getField(FieldType.mud), getField(FieldType.mud), getField(FieldType.grass), getField(FieldType.mud), getField(FieldType.water)],
  [getField(FieldType.mountain), getField(FieldType.mountain), getField(FieldType.mud), getField(FieldType.grass), getField(FieldType.mountain), getField(FieldType.mountain)],
];

export const getStore = (): Store => {
  let map: WorldMap = [];
  let player: IPlayer = { location: { x: 1, y: 1 } };

  const updatePlayerLocation = (location: ILocation): IPlayer => ({ ...player, location });

  const getField = (location: ILocation): IField | undefined => map.find((row, y) => location.y === y)?.find((row, x) => location.x === x);

  return {
    init: () => {
      if (map.length === 0) {
        map = initWorldMap;
      }
    },
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
