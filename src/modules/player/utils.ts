import { ILocation, IPlayer } from './interfaces';
import { IArmyUnit } from '../army/interfaces';
import { IPlayerResources } from '../resources/interfaces';
import { IMaybe, Nullable, success, fail, IEither, Optional } from 'tabor';
import { maxUnits } from '../barracks/maxUnits';
import { equals } from '../../tools';
import { Right } from 'fputils';

export const isPlayerField = (location: ILocation, player: IPlayer): boolean => equals(location.x, player.location.x) && equals(location.y, player.location.y);

export const addUnit = (army: IArmyUnit[], unit: IArmyUnit, buyCount: number): IArmyUnit[] => {
  if (buyCount > 0) {
    const exist = army.findIndex((ownedUnit) => equals(ownedUnit.id, unit.id));
    if (exist >= 0) {
      army[exist].owned = (army[exist].owned ?? 0) + buyCount;
      return army;
    }
    return [...army, { ...unit, owned: buyCount }];
  }
  return army;
};

export const addResources = (resources: Partial<IPlayerResources>, player: IPlayer): IPlayerResources =>
  Object.keys(resources).reduce((acc, key) => {
    return { ...acc, [key]: acc[key] + resources[key] };
  }, player.resources);

export const buyUnit = (resources: IPlayerResources, unit: IArmyUnit, count: number): Nullable<IPlayerResources> => {
  const maxCanBuy = maxUnits(unit, resources);
  if (count > maxCanBuy) {
    return null;
  }

  const cost = unit.cost
    .map((cost) => ({ ...cost, amount: cost.amount * count }))
    .reduce((acc, curr) => ({ ...acc, [curr.type]: resources[curr.type] - curr.amount }), {} as IPlayerResources);
  return { ...resources, ...cost };
};

const getPlayerIndex = (players: IPlayer[], nextPlayerIndex: number): number => (nextPlayerIndex > players.length - 1 ? 0 : nextPlayerIndex);
export const equalsPlayerId = (player: IPlayer, playerId: number): boolean => player.id === playerId;

export const changeActivePlayer =
  (activePlayerId: number) =>
  (players: IPlayer[]): IPlayer[] => {
    if (players.length <= 1) {
      return players;
    }

    const activePlayerIndex = players.findIndex((player) => equalsPlayerId(player, activePlayerId));
    if (activePlayerIndex >= 0) {
      return players.map((player, index) => {
        if (equals(index, activePlayerIndex)) {
          return { ...player, isActive: false };
        }
        return equals(index, getPlayerIndex(players, activePlayerIndex + 1)) ? { ...player, isActive: true } : player;
      });
    }
    return players;
  };

export const activePlayer = (players: IPlayer[]): IPlayer => {
  const active = players.find((player) => player.isActive);
  if (!active) {
    return players[0];
  }
  return active;
};
