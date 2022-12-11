import { ILocation, IPlayer } from './interfaces';
import { IArmyUnit } from '../army/interfaces';
import { IPlayerResources } from '../resources/interfaces';

export const isPlayerField = (location: ILocation, player: IPlayer): boolean => location.x === player.location.x && location.y === player.location.y;

export const addUnit = (army: IArmyUnit[], unit: IArmyUnit, buyCount: number): IArmyUnit[] => {
  if (buyCount > 0) {
    const exist = army.findIndex((ownedUnit) => ownedUnit.id === unit.id);
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
