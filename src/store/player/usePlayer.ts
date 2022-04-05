import { useState } from 'react';
import { IField, ILocation, IPlayer, IResources, WorldMap } from '../../interfaces';
import { initPlayer } from '../../init';
import { isObstacleField } from '../utils';

export type IUserPlayer = ReturnType<typeof usePlayer>;

const getField = (map: WorldMap, location: ILocation): IField | undefined => map.find((row, y) => location.y === y)?.find((row, x) => location.x === x);

export const usePlayer = (defaultMovement: number) => {
  const [player, setPlayer] = useState<IPlayer>(initPlayer);

  const movePlayer = (location: IPlayer['location'], remainingMovement: IPlayer['remainingMovement'], map: WorldMap) => {
    const field = getField(map, location);
    if (field && !isObstacleField(field)) {
      return setPlayer({ ...player, location, remainingMovement });
    }
  };

  const onEndTurn = (resources?: Partial<IResources>) => {
    const updated: IResources = resources
      ? Object.keys(resources).reduce((acc, key) => {
          return { ...acc, [key]: acc[key] + resources[key] };
        }, player.resources)
      : player.resources;

    setPlayer({ ...player, resources: updated, remainingMovement: defaultMovement });
  };
  return { player, movePlayer, onEndTurn };
};
