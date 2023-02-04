import { FieldType, IField, IGameStore, IInitMapFieldType, IInitStore } from 'homam/modules/store/interfaces';
import { getFieldMeta } from 'homam/modules/field/utils';

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
  turn: 1,
  map: {
    ...store.map,
    fields: mapFields(store.map.fields),
  },
  player: { ...store.player, hero: { ...store.player.hero, stepsLeft: 5 } },
});

export const subtractFieldWeight = (stepsLeft: number, field: IField) => {
  const { weight } = getFieldMeta(field.type);
  const result = stepsLeft - weight;
  return result >= 0 ? result : 0;
};
