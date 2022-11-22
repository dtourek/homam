import { IConfig } from '../../../interfaces';
import { IPlayer } from '../../player/interfaces';
import { IPath } from '../../path/usePath';
import { getResourceField, getResourceFieldColor } from '../../resources/utils';
import { IResourceField } from '../../resources/interfaces';
import { getPathField } from '../../path/utils';
import { isPlayerField } from '../../player/utils';
import { getFieldSurfaceColor } from '../../surface/color';
import { IFieldRaw } from './interfaces';
import { isObstacleField } from './utils';

export const getFields = ({ unit, map }: IConfig, player: IPlayer, path: IPath[], resources: IResourceField[]): IFieldRaw[] => {
  const fields: IFieldRaw[] = [];

  map.forEach((row, y) =>
    row.forEach((field, x) => {
      const fill = getFieldSurfaceColor(field.type);

      if (isPlayerField({ x, y }, player)) {
        return fields.push({ x, y, height: unit, width: unit, fill: 'red' });
      }

      if (isObstacleField(field)) {
        return fields.push({ x, y, height: unit, width: unit, fill, stroke: 'white' });
      }

      const pathField = getPathField(path, x, y);
      if (pathField) {
        return fields.push({ x, y, height: unit, width: unit, fill: pathField.reachable ? '#99D17B' : '#F7E67D' });
      }

      const resourceField = getResourceField(resources, { x, y });
      if (resourceField?.resource) {
        return fields.push({ x, y, height: unit, width: unit, fill: getResourceFieldColor(resourceField.resource) });
      }

      return fields.push({ x, y, height: unit, width: unit, fill });
    }),
  );

  return fields;
};
