import { IArmyUnit, UnitAttackType, UnitMovementType, UnitName } from './interfaces';
import { ResourceType } from '../resources/interfaces';
import { Race } from '../race/types';

export const imp: IArmyUnit = {
  id: 3,
  name: UnitName.imp,
  attack: { type: UnitAttackType.close, damage: [1, 2] },
  cost: [{ type: ResourceType.gold, amount: 2 }],
  race: Race.warlock,
  hp: 2,
  movement: { type: UnitMovementType.foot, speed: 3 },
};
