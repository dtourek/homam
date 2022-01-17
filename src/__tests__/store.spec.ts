import { FieldType } from '../map/field';
import { getStore } from '../store';

describe('store', () => {
  const defaultPlayer = { location: { x: 0, y: 0 } };
  const map = [
    [{ type: FieldType.forest }, { type: FieldType.mountain }],
    [{ type: FieldType.grass }, { type: FieldType.mud }],
  ];

  it('should return store with empty map and default player', () => {
    const store = getStore([], defaultPlayer);

    expect(store.getMap()).toEqual([]);
    expect(store.getPlayer()).toEqual(defaultPlayer);
  });

  it('should return store with a map', () => {
    const store = getStore(map, defaultPlayer);

    expect(store.getMap()).toEqual(map);
    expect(store.getPlayer()).toEqual(defaultPlayer);
  });

  it('should not update player location when attempted to update location to obstacle field', () => {
    const store = getStore(map, defaultPlayer);

    expect(store.getPlayer()).toEqual(defaultPlayer);
    const updatedPlayer = store.updatePlayerLocation({ x: 0, y: 0 });
    expect(updatedPlayer).toEqual(defaultPlayer);
  });

  it('should update player location', () => {
    const map = [
      [{ type: FieldType.mud }, { type: FieldType.mud }],
      [{ type: FieldType.grass }, { type: FieldType.grass }],
    ];
    const store = getStore(map, defaultPlayer);

    expect(store.getPlayer()).toEqual(defaultPlayer);
    const updatedPlayer = store.updatePlayerLocation({ x: 1, y: 0 });
    expect(updatedPlayer).toEqual({ location: { x: 1, y: 0 } });
  });
});
