import React, { MouseEvent, SVGProps } from "react";
import {FieldObjectType, IMapField} from "homam/modules/field/interfaces";

interface IProps {
  onClick: (event: MouseEvent) => void;
  x: number;
  y: number;
  field: IMapField;
  fieldSize: number
}

const getSvgProps = (x: number, y: number, field: IMapField, fieldSize: number): SVGProps<SVGRectElement> => {
  if (field.onField?.type === FieldObjectType.Resource) {
    return { x: x * fieldSize, y: y * fieldSize, height: fieldSize * 0.8 , width: fieldSize * 0.8, fill: field.onField.object.color, stroke: 'white' };
  }

  return { x: x * fieldSize, y: y * fieldSize, height: fieldSize, width: fieldSize, fill: field.type.color, stroke: 'white' };
}

export const Field = ({ y, x, field, onClick, fieldSize}: IProps) => <rect key={`${x},${y}`} onClick={onClick} {...getSvgProps(x, y, field, fieldSize)} />;
