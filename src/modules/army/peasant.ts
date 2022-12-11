import { IArmyUnit, UnitAttackType, UnitMovementType, UnitName } from './interfaces';
import { ResourceType } from '../resources/interfaces';
import { Race } from '../race/types';

export const peasant: IArmyUnit = {
  id: 1,
  name: UnitName.peasant,
  race: Race.knight,
  attack: { type: UnitAttackType.close, damage: [1, 1] },
  hp: 1,
  movement: { type: UnitMovementType.foot, speed: 1 },
  cost: [{ type: ResourceType.gold, amount: 1 }],
};
