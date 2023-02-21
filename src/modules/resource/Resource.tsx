import React from 'react';
import { useAppSelector } from 'homam/store';
import { getResourceColor } from 'homam/modules/resource/getResourceColor';
import { IResource } from 'homam/modules/store/interfaces';

interface IProps {
  resource: IResource;
  fieldColor: string;
}

export const Resource = ({ resource, fieldColor }: IProps) => {
  const store = useAppSelector((state) => state.game);
  const fill = getResourceColor(resource.type);
  return (
    <>
      <rect
        width={store.map.fieldSize}
        height={store.map.fieldSize}
        x={resource.location.x * store.map.fieldSize}
        y={resource.location.y * store.map.fieldSize}
        fill={fieldColor}
      />
      <rect
        width={store.map.fieldSize / 2}
        height={store.map.fieldSize / 2}
        x={resource.location.x * store.map.fieldSize + store.map.fieldSize / 4}
        y={resource.location.y * store.map.fieldSize + store.map.fieldSize / 4}
        fill={fill}
      />
    </>
  );
};
