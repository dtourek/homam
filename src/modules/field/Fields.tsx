import React from 'react';
import { useAppSelector } from 'homam/store';
import { getFieldMeta } from 'homam/modules/field/utils';

interface IProps {
  x: number;
  y: number;
  color: string;
  fieldSize: number;
}

const Field = ({ y, x, color, fieldSize }: IProps) => (
  <rect key={`${x},${y}`} x={x * fieldSize} y={y * fieldSize} height={fieldSize} width={fieldSize} fill={color} stroke="white" />
);

// TODO - fields to 1D array to improve peformance
export const Fields = () => {
  const store = useAppSelector((state) => state.game);

  return (
    <>
      {store.map.fields.map((row) =>
        row.flatMap((field) => {
          const { color } = getFieldMeta(field.type);
          return <Field key={`${field.x}-${field.y}`} x={field.x} y={field.y} color={color} fieldSize={store.map.fieldSize} />;
        }),
      )}
    </>
  );
};
