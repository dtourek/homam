import { useState } from 'react';
import { initPlayer } from '../../init';
import { ILocation, IPlayer } from './interfaces';
import { IField, WorldMap } from '../map/interfaces';
import { IMapResource, IPlayerResources } from '../resources/interfaces';
import { isObstacleField } from '../map/utils';

export type IUserPlayer = ReturnType<typeof usePlayer>;

const getField = (map: WorldMap, location: ILocation): IField | undefined => map.find((row, y) => location.y === y)?.find((row, x) => location.x === x);

export const usePlayer = (defaultMovement: number) => {
  const [player, setPlayer] = useState<IPlayer>(initPlayer);

  const movePlayer = (targetLocation: IPlayer['location'], remainingMovement: IPlayer['remainingMovement'], map: WorldMap) => {
    const field = getField(map, targetLocation);
    if (field && !isObstacleField(field)) {
      return setPlayer({ ...player, location: targetLocation, remainingMovement });
    }
  };

  const onEndTurn = (resources?: Partial<IPlayerResources>) => {
    const updated: IPlayerResources = resources
      ? Object.keys(resources).reduce((acc, key) => {
          return { ...acc, [key]: acc[key] + resources[key] };
        }, player.resources)
      : player.resources;

    setPlayer({ ...player, resources: updated, remainingMovement: defaultMovement });
  };

  const increaseResource = (resource: IMapResource) => {
    setPlayer({ ...player, resources: { ...player.resources, [resource.type]: player.resources[resource.type] + resource.amount } });
  };

  return { player, movePlayer, onEndTurn, increaseResource };
};
