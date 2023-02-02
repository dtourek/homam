import { IPlayer } from './modules/player/interfaces';
import { WorldMap } from './modules/map/interfaces';
import { ResourceType } from './modules/resources/interfaces';
import { getField } from './modules/map/field/utils';
import { FieldType } from './modules/map/field/interfaces';
import { Race } from './modules/race/types';

export const initPlayerOne: IPlayer = {
  id: 1,
  isActive: true,
  location: { x: 1, y: 1 },
  remainingMovement: 5,
  resources: { gold: 10, wood: 1, rock: 0 },
  race: Race.knight,
  army: [],
};

export const initPlayerTwo: IPlayer = {
  id: 2,
  isActive: false,
  location: { x: 10, y: 10 },
  remainingMovement: 5,
  resources: { gold: 10, wood: 1, rock: 0 },
  race: Race.knight,
  army: [],
};

export const initWorldMap: WorldMap = [
  [
    getField(FieldType.forest),
    getField(FieldType.forest),
    getField(FieldType.mountain),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.desert),
    getField(FieldType.desert),
    getField(FieldType.desert),
  ],
  [
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.mountain),
    getField(FieldType.mountain),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.desert),
    getField(FieldType.desert),
    getField(FieldType.desert),
  ],
  [
    getField(FieldType.water),
    getField(FieldType.water),
    getField(FieldType.mud),
    getField(FieldType.water),
    getField(FieldType.mud),
    getField(FieldType.mud),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.water),
    getField(FieldType.water),
    getField(FieldType.water),
  ],
  [
    getField(FieldType.mountain),
    getField(FieldType.mud),
    getField(FieldType.mud),
    getField(FieldType.water),
    getField(FieldType.mud),
    getField(FieldType.water),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.water),
    getField(FieldType.water),
    getField(FieldType.water),
  ],
  [
    getField(FieldType.mud),
    getField(FieldType.mud),
    getField(FieldType.mud),
    getField(FieldType.grass),
    getField(FieldType.mud),
    getField(FieldType.water),
    getField(FieldType.grass),
    getField(FieldType.grass, { type: ResourceType.gold, amount: 1000 }),
    getField(FieldType.grass),
    getField(FieldType.water),
    getField(FieldType.water),
    getField(FieldType.water),
  ],
  [
    getField(FieldType.mountain),
    getField(FieldType.mountain),
    getField(FieldType.mud),
    getField(FieldType.grass),
    getField(FieldType.mountain),
    getField(FieldType.mountain),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.water),
    getField(FieldType.water),
    getField(FieldType.water),
  ],
  [
    getField(FieldType.mountain),
    getField(FieldType.mountain),
    getField(FieldType.mud),
    getField(FieldType.grass),
    getField(FieldType.mountain),
    getField(FieldType.mountain),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.swamp),
    getField(FieldType.swamp),
    getField(FieldType.mud),
  ],
  [
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.mud),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.swamp),
    getField(FieldType.mud),
    getField(FieldType.mud),
  ],
  [
    getField(FieldType.mountain),
    getField(FieldType.mountain),
    getField(FieldType.mud),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.swamp),
    getField(FieldType.swamp),
    getField(FieldType.mud),
    getField(FieldType.mud),
    getField(FieldType.mud),
    getField(FieldType.mud),
  ],
  [
    getField(FieldType.mountain),
    getField(FieldType.mountain),
    getField(FieldType.mud),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.swamp),
    getField(FieldType.swamp),
    getField(FieldType.mud),
    getField(FieldType.mud),
    getField(FieldType.mud),
    getField(FieldType.mud),
  ],
  [
    getField(FieldType.mountain),
    getField(FieldType.mountain),
    getField(FieldType.mud),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.mud),
    getField(FieldType.mud),
    getField(FieldType.mud),
    getField(FieldType.mud),
    getField(FieldType.mud),
  ],
  [
    getField(FieldType.mountain),
    getField(FieldType.mountain),
    getField(FieldType.mud),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.grass),
    getField(FieldType.mud),
    getField(FieldType.mud),
    getField(FieldType.mud),
    getField(FieldType.mud),
    getField(FieldType.mud),
  ],
];