import React from 'react';
import { useAppSelector } from 'homam/store';
import { getFieldMeta } from 'homam/modules/field/utils';
import { IField } from 'homam/modules/store/interfaces';
import { Resource } from 'homam/modules/resource/Resource';

interface IProps {
  field: IField;
  color: string;
  fieldSize: number;
}

const Field = ({ field, color, fieldSize }: IProps) => <rect x={field.x * fieldSize} y={field.y * fieldSize} height={fieldSize} width={fieldSize} fill={color} stroke="white" />;

// TODO - fields to 1D array to improve peformance
export const Fields = () => {
  const store = useAppSelector((state) => state.game);

  return (
    <>
      {store.map.fields.map((row) =>
        row.flatMap((field) => {
          const resource = store.map.resources.find((resource) => resource.location.x === field.x && resource.location.y === field.y);
          const { color } = getFieldMeta(field.type);
          if (resource) {
            return <Resource resource={resource} fieldColor={color} />;
          }
          return <Field key={`${field.x}-${field.y}`} field={field} color={color} fieldSize={store.map.fieldSize} />;
        }),
      )}
    </>
  );
};
