import React, { useEffect, useState } from 'react';
import { IConfig } from '../../interfaces';
import { IPath } from '../path/usePath';
import { IPlayer } from '../player/interfaces';
import { IResourceField } from '../resources/interfaces';
import { getFields } from './field/getFields';
import { Field } from './field/Field';

interface IMapProps {
  config: IConfig;
  onFieldClick: (x: number, y: number) => void;
  player: IPlayer;
  path: IPath[];
  resources: IResourceField[];
}

export const Map = ({ config, onFieldClick, player, path, resources }: IMapProps) => {
  const [fields, setFields] = useState(getFields(config, player, path, resources));

  useEffect(() => {
    setFields(getFields(config, player, path, resources));
  }, [path, player, config, resources]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={config.mapMaxSize} width={config.mapMaxSize}>
      {fields.map(({ x, y, ...props }) => (
        <Field key={`unit-${x},${y}`} {...props} x={x * config.unit} y={y * config.unit} onClick={() => onFieldClick(x, y)} />
      ))}
    </svg>
  );
};
