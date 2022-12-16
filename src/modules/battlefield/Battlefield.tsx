import { Field } from '../map/field/Field';
import React, { useState } from 'react';
import { FieldType, IFieldRaw } from '../map/field/interfaces';
import { IArmyUnit, UnitName } from '../army/interfaces';
import { ILocation, IPlayer } from '../player/interfaces';

interface IBattleArmy {
  unit: IArmyUnit;
  position: ILocation;
}

interface IBattleField {
  type: FieldType.forest;
  isObstacle: false;
  army?: IBattleArmy;
}

const row: IBattleField[] = Array(10)
  .fill(undefined)
  .map(() => ({ type: FieldType.forest, isObstacle: false }));
const battleFields: IBattleField[][] = Array(10)
  .fill(undefined)
  .map(() => row);

// const addArmyUnits = (armies: IArmyUnit[][], fields: IBattleField[][]) => {};

// const getArmyUnitColor = (unit: IArmyUnit): string => {
//   switch (unit.name) {
//     case UnitName.peasant:
//       return;
//   }
// };

const getBattlefields = (battleFields: IBattleField[][]): IFieldRaw[] =>
  battleFields.flatMap((row, y) =>
    row.flatMap((field, x) => {
      if (field.army) {
        return { x, y, fill: 'white', height: 50, width: 50, stroke: 'black' };
      }

      return { x, y, fill: '#C2F3D6', height: 50, width: 50, stroke: 'black' };
    }),
  );

interface IProps {
  armies: IArmyUnit[][];
}

export const Battlefield = ({ armies }: IProps) => {
  const [fields, setFields] = useState(getBattlefields(battleFields));
  const onFieldClick = (x: number, y: number) => {
    console.log(':: clicked', y, y);
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={500} width={500}>
      {fields.map(({ x, y, ...props }) => (
        <Field key={`unit-${x},${y}`} {...props} x={x * 50} y={y * 50} onClick={() => onFieldClick(x, y)} />
      ))}
    </svg>
  );
};
