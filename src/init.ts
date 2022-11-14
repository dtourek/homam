import { IPlayer } from './modules/player/interfaces';
import { FieldType, WorldMap } from './modules/map/interfaces';
import { getField } from './modules/map/utils';

export const initPlayer: IPlayer = { location: { x: 1, y: 1 }, remainingMovement: 5, resources: { gold: 10000, wood: 50, rock: 50 } };

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
