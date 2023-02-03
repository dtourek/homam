import { FieldType, IField, IGameStore, IInitMapFieldType, IInitStore } from 'homam/modules/store/interfaces';

const getFieldType = (field: IInitMapFieldType): FieldType => {
  switch (field) {
    case 'G':
      return FieldType.grass;
    case 'D':
      return FieldType.desert;
    case 'M':
    default:
      return FieldType.mountain;
  }
};

const mapFields = (initFields: IInitMapFieldType[][]): IField[][] => initFields.map((row, y) => row.flatMap((field, x) => ({ type: getFieldType(field), x, y })));

export const toGameStore = (store: IInitStore): IGameStore => ({
  ...store,
  map: {
    ...store.map,
    fields: mapFields(store.map.fields),
  },
  player: { ...store.player, hero: { ...store.player.hero, isMoving: false } },
});
