import React, {useContext, useEffect, useState} from "react";
import {ConfigContext} from "homam/modules/config/store";
import {Field} from "homam/modules/field/Field";

export const Map = () => {
  const config = useContext(ConfigContext)

  const onFieldClick = (x: number, y: number) => {
    console.log('CLICKED ON:', x, y)
  }

  return <svg xmlns="http://www.w3.org/2000/svg" height={config.map.maxSize} width={config.map.maxSize}>
    {config.map.fields.map((row, x) => row.flatMap((field, y) => <Field key={`field-${x},${y}`} fieldSize={config.map.fieldSize} field={field} x={x} y={y} onClick={() => onFieldClick(x, y)} />))}
  </svg>
}
