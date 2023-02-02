import { IArmyUnit, UnitAttackType, UnitMovementType, UnitName } from './interfaces';
import { ResourceType } from '../resources/interfaces';
import { Race } from '../race/types';

export const marksman: IArmyUnit = {
  id: 2,
  name: UnitName.marksman,
  attack: { type: UnitAttackType.distance, damage: [1, 5] },
  cost: [{ type: ResourceType.gold, amount: 5 }],
  race: Race.knight,
  hp: 5,
  movement: { type: UnitMovementType.foot, speed: 3 },
};
