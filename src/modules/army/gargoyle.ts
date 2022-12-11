import { IArmyUnit, UnitAttackType, UnitMovementType, UnitName } from './interfaces';
import { ResourceType } from '../resources/interfaces';
import { Race } from '../race/types';

export const gargoyle: IArmyUnit = {
  id: 4,
  name: UnitName.gargoyle,
  attack: { type: UnitAttackType.close, damage: [1, 5] },
  cost: [{ type: ResourceType.gold, amount: 5 }],
  race: Race.warlock,
  hp: 5,
  movement: { type: UnitMovementType.flying, speed: 5 },
};
