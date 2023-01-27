import React, { MouseEvent } from "react";
import { IMapField } from "homam/modules/field/interfaces";
import {WithRequiredProperty} from "homam/interfaces";

interface IProps {
  onClick: (event: MouseEvent) => void;
  x: number;
  y: number;
  field: IMapField;
  fieldSize: number
}

interface IObjectFieldProps {
  fieldSize: number;
  x: number;
  y: number;
  field: WithRequiredProperty<IMapField, 'onField'>
}


const hasObject = (field: IMapField): field is WithRequiredProperty<IMapField, 'onField'> => !!field.onField

const ObjectField = ({fieldSize, x, y, field}: IObjectFieldProps) => (
  <svg xmlns="http://www.w3.org/2000/svg">
    <rect width={fieldSize} height={fieldSize} x={x} y={y} fill={field.type.color} />
    <rect width={fieldSize / 2} height={fieldSize / 2} x={x + fieldSize / 4} y={y + fieldSize / 4} fill={field.onField.object.color} stroke="black" />
  </svg>
)

export const Field = ({ y, x, field, onClick, fieldSize}: IProps) => {
  const base = { x: x * fieldSize, y: y * fieldSize, height: fieldSize, width: fieldSize, fill: field.type.color, stroke: 'white' }

  if (hasObject(field)) {
    return <ObjectField fieldSize={fieldSize} x={base.x} y={base.y} field={field} />
  }

  return <rect key={`${x},${y}`} onClick={onClick} {...base} />;
}
