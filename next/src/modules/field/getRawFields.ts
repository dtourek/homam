import {FieldObjectType, IFieldRaw} from "homam/modules/field/interfaces";
import {IConfig} from "homam/modules/config/store";

export const getRawFields = ({ map }: IConfig): IFieldRaw[] => {
  const fields: IFieldRaw[] = [];

  map.fields.forEach((row, y) =>
    row.forEach((field, x) => {
      const toAdd = { x, y, height: map.fieldSize, width: map.fieldSize, fill: field.field.color, stroke: 'white' }

      // if (isPlayerField({ x, y }, player)) {
      //   return fields.push({ x, y, height: unit, width: unit, fill: 'red' });
      // }

      if (field.field.isObstacle) {
        return fields.push(toAdd);
      }

      // const pathField = getPathField(path, x, y);
      // if (pathField) {
      //   return fields.push({ x, y, height: unit, width: unit, fill: pathField.reachable ? '#99D17B' : '#F7E67D' });
      // }

      if (field.onField?.type === FieldObjectType.Resource) {
        return fields.push({...toAdd,   x, y, height: Math.round(map.fieldSize * 0.8), width: Math.round(map.fieldSize * 0.8), fill: field.onField.object.color });
      }

      return fields.push(toAdd);
    }),
  );

  return fields;
};
