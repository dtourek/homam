import { FieldType } from 'homam/modules/store/interfaces';

export const getFieldMeta = (type: FieldType): { color: string; weight: number } => {
  switch (type) {
    case FieldType.grass:
      return { color: '#C2F3D6', weight: 1 };
    case FieldType.desert:
      return { color: '#E7E4A5', weight: 2 };
    case FieldType.mountain:
    default:
      return { color: '#1C1C1D', weight: 999999 };
  }
};
