import { maxUnits } from '../maxUnits';
import { IArmyUnit, UnitAttackType, UnitMovementType, UnitName } from '../../army/interfaces';
import { ResourceType } from '../../resources/interfaces';
import { Race } from '../../race/types';

const mockedUnit: IArmyUnit = {
  id: 1,
  name: UnitName.gargoyle,
  cost: [{ type: ResourceType.wood, amount: 1 }],
  owned: 1,
  race: Race.knight,
  hp: 1,
  movement: { type: UnitMovementType.flying, speed: 1 },
  attack: { type: UnitAttackType.distance, damage: [1, 1] },
};

describe('maxUnits', () => {
  it('should buy return 0 when no resources available', () => {
    expect(maxUnits(mockedUnit, { [ResourceType.gold]: 0, [ResourceType.rock]: 0, [ResourceType.wood]: 0 })).toEqual(0);
  });

  it('should return 1 when exactly 1 resource needed', () => {
    expect(maxUnits(mockedUnit, { [ResourceType.gold]: 0, [ResourceType.rock]: 0, [ResourceType.wood]: 1 })).toEqual(1);
  });

  it('should return 5 when wood resource is enough for 5 units', () => {
    expect(maxUnits(mockedUnit, { [ResourceType.gold]: 0, [ResourceType.rock]: 0, [ResourceType.wood]: 5 })).toEqual(5);
  });

  it('should return 2 when smallest number of resource is only for 2 units', () => {
    const expensiveUnit: IArmyUnit = {
      ...mockedUnit,
      cost: [
        { type: ResourceType.gold, amount: 1 },
        { type: ResourceType.wood, amount: 1 },
      ],
    };
    expect(maxUnits(expensiveUnit, { [ResourceType.gold]: 2, [ResourceType.rock]: 0, [ResourceType.wood]: 5 })).toEqual(2);
  });

  it('should return 0 one of the resources is short', () => {
    const expensiveUnit: IArmyUnit = {
      ...mockedUnit,
      cost: [
        { type: ResourceType.gold, amount: 1000 },
        { type: ResourceType.wood, amount: 1 },
        { type: ResourceType.rock, amount: 1 },
      ],
    };
    expect(maxUnits(expensiveUnit, { [ResourceType.gold]: 5, [ResourceType.rock]: 5, [ResourceType.wood]: 5 })).toEqual(0);
  });
});
