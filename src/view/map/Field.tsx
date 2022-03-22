import React from 'react';
import { IFieldObj } from './Map';
import { MouseEvent } from 'react';

interface IProps extends IFieldObj {
  onClick: (event: MouseEvent) => void;
}

export const Field = (props: IProps) => <rect key={`${props.x},${props.y}`} {...props} onClick={props.onClick} />;
