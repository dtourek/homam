import { getUnitsByRace } from '../getUnitsByRace';
import { Race } from '../../race/types';

describe('getUnitsByRace', () => {
  it('should return [] when wrong race used', () => {
    expect(getUnitsByRace('xx' as any)).toEqual([]);
  });

  describe('knight', () => {
    it('Should return all units from knight race', () => {
      expect(getUnitsByRace(Race.knight)).toEqual([
        {
          id: 1,
          name: 'peasant',
          race: 'knight',
          attack: { damage: [1, 1], type: 'close' },
          cost: [{ amount: 1, type: 'gold' }],
          hp: 1,
          movement: { speed: 1, type: 'foot' },
        },
        {
          id: 2,
          name: 'marksman',
          race: 'knight',
          attack: { damage: [1, 5], type: 'distance' },
          cost: [{ amount: 5, type: 'gold' }],
          hp: 5,
          movement: { speed: 3, type: 'foot' },
        },
      ]);
    });
  });

  describe('warlock', () => {
    it('Should return all units from knight race', () => {
      expect(getUnitsByRace(Race.warlock)).toEqual([
        {
          id: 3,
          name: 'imp',
          race: 'warlock',
          attack: { damage: [1, 2], type: 'close' },
          cost: [{ amount: 2, type: 'gold' }],
          hp: 2,
          movement: { speed: 3, type: 'foot' },
        },
        {
          id: 4,
          name: 'gargoyle',
          race: 'warlock',
          attack: { damage: [1, 5], type: 'close' },
          cost: [{ amount: 5, type: 'gold' }],
          hp: 5,
          movement: { speed: 5, type: 'flying' },
        },
      ]);
    });
  });
});
