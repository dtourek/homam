import { IArmyUnit } from '../army/interfaces';
import { IPlayerResources } from '../resources/interfaces';

export const maxUnits = (unit: IArmyUnit, resources: IPlayerResources): number => {
  const maxValues = unit.cost.map((cost) => Math.floor(resources[cost.type] / cost.amount));
  return Math.min(...maxValues);
};
