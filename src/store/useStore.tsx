import { useState } from 'react';
import { IField, ILocation, IPlayer, WorldMap } from '../interfaces';
import { initPlayer, initWorldMap } from '../init';
import { isObstacleField } from './utils';

const getField = (map: WorldMap, location: ILocation): IField | undefined => map.find((row, y) => location.y === y)?.find((row, x) => location.x === x);

export interface IStore {
  map: WorldMap;
  updateMap: (map: WorldMap) => void;
  player: IPlayer;
  updatePlayerLocation: (playerLocation: ILocation) => void;
  path: ILocation[];
  setPath: (location: ILocation[]) => void;
  pathWeight: number;
  setPathWeight: (weight: number) => void;
}

export const useStore = (): IStore => {
  const [map, updateMap] = useState<WorldMap>(initWorldMap);
  const [player, setPlayer] = useState<IPlayer>(initPlayer);
  const [path, setPath] = useState<ILocation[]>([]);
  const [pathWeight, setPathWeight] = useState<number>(0);

  const updatePlayerLocation = (location: ILocation) => {
    const field = getField(map, location);
    if (field && !isObstacleField(field)) {
      return setPlayer({ ...player, location });
    }
  };

  return { map, updateMap, player, updatePlayerLocation, path, setPath, pathWeight, setPathWeight };
};
