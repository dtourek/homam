import { useState } from 'react';
import { IField, ILocation, IPlayer, WorldMap } from '../interfaces';
import { initPlayer, initWorldMap } from '../init';
import { isObstacleField } from './utils';

const getField = (map: WorldMap, location: ILocation): IField | undefined => map.find((row, y) => location.y === y)?.find((row, x) => location.x === x);

export const useStore = () => {
  const [map, updateMap] = useState<WorldMap>(initWorldMap);
  const [player, setPlayer] = useState<IPlayer>(initPlayer);
  const [path, setPath] = useState<ILocation[]>([]);

  const updatePlayerLocation = (location: ILocation) => {
    const field = getField(map, location);
    if (field && !isObstacleField(field)) {
      return setPlayer({ ...player, location });
    }
  };

  return { map, updateMap, player, updatePlayerLocation, path, setPath };
};
