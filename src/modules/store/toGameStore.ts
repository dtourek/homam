import { FieldType, IField, IGameStore, IInitMapFieldType, IInitStore } from 'homam/modules/store/interfaces';

const getFieldColor = (code: string) => {
  switch (code) {
    case 'D':
      return '#E7E4A5';
    case 'M':
      return '#1C1C1D';
    case 'G':
      return '#C2F3D6';
    default:
      return 'black';
  }
};

const getFieldWeight = (code: IInitMapFieldType): number => {
  switch (code) {
    case 'G':
      return 1;
    case 'D':
      return 2;
    default:
      return 100;
  }
};

const mapFields = (initFields: IInitMapFieldType[][]): IField[] =>
  initFields.flatMap((row, y) =>
    row.flatMap((field, x) => ({
      type: FieldType.grass,
      x,
      y,
      weight: getFieldWeight(field),
      color: getFieldColor(field),
    })),
  );

export const toGameStore = (store: IInitStore): IGameStore => ({
  ...store,
  map: {
    ...store.map,
    fields: mapFields(store.map.fields),
  },
});
