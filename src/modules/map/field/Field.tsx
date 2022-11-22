import React from 'react';
import { MouseEvent } from 'react';
import { IFieldRaw } from './interfaces';

interface IProps extends IFieldRaw {
  onClick: (event: MouseEvent) => void;
}

export const Field = (props: IProps) => <rect key={`${props.x},${props.y}`} {...props} onClick={props.onClick} />;
