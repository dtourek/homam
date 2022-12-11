import { useState } from 'react';
import { initPlayer } from '../../init';
import { ILocation, IPlayer } from './interfaces';
import { WorldMap } from '../map/interfaces';
import { IMapResource, IPlayerResources } from '../resources/interfaces';
import { IField } from '../map/field/interfaces';
import { isObstacleField } from '../map/field/utils';
import { IArmyUnit } from '../army/interfaces';
import { addResources, addUnit, buyUnit } from './utils';

export type IUsePlayer = ReturnType<typeof usePlayer>;

const getField = (map: WorldMap, location: ILocation): IField | undefined => map.find((row, y) => location.y === y)?.find((row, x) => location.x === x);

export const usePlayer = (defaultMovement: number) => {
  const [player, setPlayer] = useState<IPlayer>(initPlayer);

  const movePlayer = (targetLocation: IPlayer['location'], remainingMovement: IPlayer['remainingMovement'], map: WorldMap) => {
    const field = getField(map, targetLocation);
    if (field && !isObstacleField(field)) {
      return setPlayer({ ...player, location: targetLocation, remainingMovement });
    }
  };

  const onEndTurn = (resources?: Partial<IPlayerResources>): void => {
    setPlayer({ ...player, resources: resources ? addResources(resources, player) : player.resources, remainingMovement: defaultMovement });
  };

  const increaseResource = (resource: IMapResource): void => {
    setPlayer({ ...player, resources: { ...player.resources, [resource.type]: player.resources[resource.type] + resource.amount } });
  };

  const buyArmy = (unit: IArmyUnit, count: number) => {
    setPlayer({ ...player, army: addUnit(player.army, unit, count), resources: buyUnit(player.resources, unit, count) ?? player.resources });
  };

  return { player, movePlayer, onEndTurn, increaseResource, buyArmy };
};
