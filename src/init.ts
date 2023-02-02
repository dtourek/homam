import { IInitStore } from 'homam/modules/store/store';

export const initialGameStore: IInitStore = {
  player: { hero: { location: { x: 0, y: 0 }, id: 1, name: 'John' } },
  cursor: { location: { x: 0, y: 0 } },
  map: {
    maxSize: 240,
    fieldSize: 20,
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
