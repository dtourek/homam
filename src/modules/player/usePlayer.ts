import { useContext, useState } from 'react';
import { initPlayerOne, initPlayerTwo } from '../../init';
import { ILocation, IPlayer } from './interfaces';
import { WorldMap } from '../map/interfaces';
import { IMapResource, IPlayerResources } from '../resources/interfaces';
import { IField } from '../map/field/interfaces';
import { isObstacleField } from '../map/field/utils';
import { IArmyUnit } from '../army/interfaces';
import { addResources, addUnit, buyUnit, changeActivePlayer, equalsPlayerId } from './utils';
import { pipe } from 'tabor';
import { equals } from '../../tools';
import { ConfigStateContext } from '../store/config';

export type IUsePlayer = ReturnType<typeof usePlayer>;

const getField = (map: WorldMap, location: ILocation): IField | undefined => map.find((row, y) => equals(location.y, y))?.find((row, x) => equals(location.x, x));
const move = (playerId: number, players: IPlayer[], updates: Partial<IPlayer>): IPlayer[] =>
  players.map((player) => (equalsPlayerId(player, playerId) ? { ...player, ...updates } : player));

const updateOnEndTurn = (players: IPlayer[], playerId: number, defaultMovement: number, resources?: Partial<IPlayerResources>): IPlayer[] =>
  players.map((player) =>
    equalsPlayerId(player, playerId) ? { ...player, resources: resources ? addResources(resources, player) : player.resources, remainingMovement: defaultMovement } : player,
  );

export const usePlayer = () => {
  const config = useContext(ConfigStateContext);
  const [players, setPlayers] = useState<IPlayer[]>([initPlayerOne, initPlayerTwo]);

  const movePlayer = (playerId: number, targetLocation: IPlayer['location'], remainingMovement: IPlayer['remainingMovement'], map: WorldMap) => {
    const field = getField(map, targetLocation);
    if (field && !isObstacleField(field)) {
      return setPlayers(move(playerId, players, { location: targetLocation, remainingMovement }));
    }
  };

  const onEndTurn = (playerId: number, resources?: Partial<IPlayerResources>): void => {
    setPlayers(pipe(updateOnEndTurn(players, playerId, config.playerMove, resources), changeActivePlayer(playerId)));
  };

  const increaseResource = (playerId: number, resource: IMapResource): void => {
    setPlayers(
      players.map((player) =>
        equalsPlayerId(player, playerId) ? { ...player, resources: { ...player.resources, [resource.type]: player.resources[resource.type] + resource.amount } } : player,
      ),
    );
  };

  const buyArmy = (playerId: number, unit: IArmyUnit, count: number) => {
    setPlayers(
      players.map((player) =>
        equalsPlayerId(player, playerId) ? { ...player, army: addUnit(player.army, unit, count), resources: buyUnit(player.resources, unit, count) ?? player.resources } : player,
      ),
    );
  };

  const activePlayer = (players: IPlayer[]): IPlayer => {
    const active = players.find((player) => player.isActive);
    if (!active) {
      throw new Error('Cannot assign active player!'); // TODO - better fix
    }
    return active;
  };

  return { player: activePlayer(players), movePlayer, onEndTurn, increaseResource, buyArmy };
};
