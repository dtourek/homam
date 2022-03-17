import React from 'react';
import { IFieldObj } from './Map';
import { MouseEvent } from 'react';

interface IProps extends IFieldObj {
  onUnitClick: (event: MouseEvent) => void;
}

export const Unit = (props: IProps) => <rect key={`${props.x},${props.y}`} {...props} onClick={props.onUnitClick} />;
