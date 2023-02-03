import React, { useContext } from 'react';
import { GameStore } from 'homam/modules/store/store';

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
  const store = useContext(GameStore);
  return (
    <>
      {store.map.fields.map((row, y) =>
        row.flatMap((field, x) => <Field key={`${field.x}-${field.y}`} x={field.x} y={field.y} color={field.color} fieldSize={store.map.fieldSize} />),
      )}
    </>
  );
};
