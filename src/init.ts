import { IInitStore } from 'homam/modules/store/interfaces';

export const initialGameStore: IInitStore = {
  player: { hero: { location: { x: 0, y: 0 }, id: 1, name: 'John', path: { fields: [], weight: 0 }, isMoving: false, stepsLeft: 5 } },
  cursor: { location: { x: 0, y: 0 } },
  map: {
    fieldSize: 50,
    fields: [
      ['D', 'M', 'M', 'G', 'G', 'G', 'G', 'G', 'G', 'D', 'D', 'D'],
      ['G', 'G', 'G', 'M', 'M', 'G', 'G', 'G', 'G', 'D', 'D', 'D'],
      ['M', 'M', 'G', 'M', 'G', 'G', 'G', 'G', 'G', 'M', 'M', 'M'],
      ['M', 'G', 'G', 'M', 'G', 'M', 'G', 'G', 'G', 'M', 'M', 'M'],
      ['G', 'G', 'G', 'G', 'G', 'M', 'G', 'G', 'G', 'M', 'M', 'M'],
      ['M', 'M', 'G', 'G', 'M', 'M', 'G', 'G', 'G', 'M', 'M', 'M'],
      ['M', 'M', 'G', 'G', 'M', 'M', 'G', 'G', 'G', 'D', 'D', 'G'],
      ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'D', 'G', 'G'],
      ['M', 'M', 'G', 'G', 'G', 'G', 'D', 'D', 'G', 'G', 'G', 'G'],
      ['M', 'M', 'G', 'G', 'G', 'G', 'D', 'D', 'G', 'G', 'G', 'G'],
      ['M', 'M', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
      ['M', 'M', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
    ],
  },
};
