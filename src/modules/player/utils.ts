import { ILocation, IPlayer } from './interfaces';
import { IArmyUnit } from '../army/interfaces';
import { IPlayerResources } from '../resources/interfaces';
import { Nullable } from 'tabor';
import { maxUnits } from '../barracks/maxUnits';

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
