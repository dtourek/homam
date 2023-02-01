import React, { useContext } from "react";
import {Field} from "homam/modules/field/Field";
import {MapContext} from "homam/modules/map/store";

export const Map = () => {
  const map = useContext(MapContext)

  const onFieldClick = (x: number, y: number) => {
    console.log('CLICKED ON:', x, y)
  }

  return <svg xmlns="http://www.w3.org/2000/svg" height={map.maxSize} width={map.maxSize}>
    {map.fields.map((row, x) => row.flatMap((field, y) => <Field key={`field-${x},${y}`} fieldSize={map.fieldSize} field={field} x={x} y={y} onClick={() => onFieldClick(x, y)} />))}
  </svg>
}
