import { useState } from 'react';
import { IField, ILocation, IPlayer, WorldMap } from '../interfaces';
import { initPlayer } from '../init';
import { isObstacleField } from './utils';

const getField = (map: WorldMap, location: ILocation): IField | undefined => map.find((row, y) => location.y === y)?.find((row, x) => location.x === x);

export const usePlayer = (defaultMovement: number) => {
  const [player, setPlayer] = useState<IPlayer>(initPlayer);

  const updatePlayer = (player: IPlayer, map: WorldMap) => {
    const field = getField(map, player.location);
    if (field && !isObstacleField(field)) {
      return setPlayer(player);
    }
  };

  const updateRemainingMovement = (remainingMovement: number) => setPlayer({ ...player, remainingMovement });
  const resetMovement = () => updateRemainingMovement(defaultMovement);

  return { player, setPlayer, resetMovement, updateRemainingMovement, updatePlayer };
};
