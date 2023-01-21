import React, {useContext, useEffect, useState} from "react";
import {ConfigContext} from "homam/modules/config/store";
import {getRawFields} from "homam/modules/field/getRawFields";
import {Field} from "homam/modules/field/Field";

export const Map = () => {
  const config = useContext(ConfigContext)

  const [fields, setFields] = useState(getRawFields(config));

  useEffect(() => {
    setFields(getRawFields(config));
  }, [config]);

  const onFieldClick = (x: number, y: number) => {
    console.log('CLICKED ON:', x, y)
  }


  return <svg xmlns="http://www.w3.org/2000/svg" height={config.map.maxSize} width={config.map.maxSize}>
    {fields.map(({ x, y, ...props }) => (
      <Field key={`field-${x},${y}`} {...props} x={x * config.map.fieldSize} y={y * config.map.fieldSize} onClick={() => onFieldClick(x, y)} />
    ))}
  </svg>
}
