import { Race } from '../../race/types';
import { IArmyUnit, UnitAttackType, UnitMovementType, UnitName } from '../../army/interfaces';
import { ResourceType } from '../../resources/interfaces';
import { IPlayer } from '../interfaces';
import { activePlayer, addResources, addUnit, buyUnit, changeActivePlayer } from '../utils';

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

const playerOne: IPlayer = {
  id: 1,
  isActive: true,
  army: [],
  resources: { [ResourceType.gold]: 0, [ResourceType.rock]: 0, [ResourceType.wood]: 0 },
  race: Race.knight,
  location: { x: 0, y: 0 },
  remainingMovement: 0,
};

const playerTwo: IPlayer = {
  id: 2,
  isActive: false,
  army: [],
  resources: { [ResourceType.gold]: 0, [ResourceType.rock]: 0, [ResourceType.wood]: 0 },
  race: Race.knight,
  location: { x: 0, y: 0 },
  remainingMovement: 0,
};

describe('utils', () => {
  describe('addUnit', () => {
    it('should not add unit to army when it does not exist in army and has 0 buy count', () => {
      expect(addUnit([], mockedUnit, 0)).toEqual([]);
    });

    it('should not add count of the unit in army when it exist, but has 0 buy count', () => {
      const army = addUnit([mockedUnit], mockedUnit, 0);
      expect(army.length).toEqual(1);
      expect(army.map((unit) => unit.owned)).toEqual([mockedUnit.owned]);
    });

    it('should add 1 unit to empty army with specific count', () => {
      const buyCount = 8;
      expect(addUnit([], mockedUnit, buyCount)).toEqual([{ ...mockedUnit, owned: buyCount }]);
    });

    it('should not add unit to the army despite it does not exist in army. Because count is 0', () => {
      expect(addUnit([mockedUnit], { ...mockedUnit, id: 2, name: UnitName.marksman }, 0)).toEqual([mockedUnit]);
    });

    it('should add a unit to the army when new unit not exist in army', () => {
      const marksman = { ...mockedUnit, id: 2, name: UnitName.marksman, owned: 0 };
      expect(addUnit([mockedUnit], marksman, 4)).toEqual([mockedUnit, { ...marksman, owned: 4 }]);
    });
  });

  describe('addResources', () => {
    it('should not add any resource to the player when all values are 0', () => {
      expect(addResources({ [ResourceType.gold]: 0, [ResourceType.rock]: 0 }, playerOne)).toEqual(playerOne.resources);
    });

    it('should add 1 gold resource to the player', () => {
      expect(addResources({ [ResourceType.gold]: 1 }, playerOne)).toEqual({ [ResourceType.gold]: 1, [ResourceType.rock]: 0, [ResourceType.wood]: 0 });
    });

    it('should add all resources', () => {
      expect(
        addResources(
          { [ResourceType.gold]: 50, [ResourceType.rock]: 50, [ResourceType.wood]: 50 },
          { ...playerOne, resources: { [ResourceType.gold]: 100, [ResourceType.rock]: 10, [ResourceType.wood]: 10 } },
        ),
      ).toEqual({
        [ResourceType.gold]: 150,
        [ResourceType.wood]: 60,
        [ResourceType.rock]: 60,
      });
    });
  });

  describe('buyUnit', () => {
    it('should return null when cost of the troops is more than user has in resources', () => {
      expect(buyUnit({ [ResourceType.gold]: 0, [ResourceType.wood]: 0, [ResourceType.rock]: 0 }, mockedUnit, 111)).toEqual(null);
    });

    it('should return resources minus 1 unit', () => {
      expect(buyUnit({ [ResourceType.gold]: 10, [ResourceType.wood]: 10, [ResourceType.rock]: 10 }, mockedUnit, 1)).toEqual({
        [ResourceType.gold]: 10,
        [ResourceType.wood]: 9,
        [ResourceType.rock]: 10,
      });
    });
  });

  describe('changeActivePlayer', () => {
    it('should return []', () => {
      expect(changeActivePlayer(0)([])).toEqual([]);
      expect(changeActivePlayer(1)([])).toEqual([]);
    });

    it('should return unchanged players when such player not exist', () => {
      expect(changeActivePlayer(45)([playerOne])).toEqual([playerOne]);
    });

    it('should return same player when only 1 player exist', () => {
      expect(changeActivePlayer(playerOne.id)([playerOne])).toEqual([playerOne]);
    });

    it('should change isActive from first to second player', () => {
      expect(changeActivePlayer(playerOne.id)([playerOne, playerTwo])).toMatchObject([
        { id: playerOne.id, isActive: false },
        { id: playerTwo.id, isActive: true },
      ]);
    });

    it('should change isActive fron last player to first player', () => {
      expect(changeActivePlayer(playerTwo.id)([{ ...playerOne, isActive: false }, playerTwo])).toMatchObject([
        { id: playerOne.id, isActive: true },
        { id: playerTwo.id, isActive: false },
      ]);
    });
  });

  describe('activePlayer', () => {
    it('should return default player when 1 player present', () => {
      expect(activePlayer([playerOne])).toEqual(playerOne);
    });

    it('should return first default player when none player is active', () => {
      expect(activePlayer([{ ...playerOne, isActive: false }, playerTwo])).toEqual({ ...playerOne, isActive: false });
    });

    it('should return second player when is set to active', () => {
      expect(
        activePlayer([
          { ...playerOne, isActive: false },
          { ...playerTwo, isActive: true },
        ]),
      ).toEqual({ ...playerTwo, isActive: true });
    });
  });
});
