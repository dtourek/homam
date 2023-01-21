import React, {MouseEvent} from "react";
import { IFieldRaw } from "homam/modules/field/interfaces";

interface IProps extends IFieldRaw {
  onClick: (event: MouseEvent) => void;
}

export const Field = (props: IProps) => <rect key={`${props.x},${props.y}`} {...props} onClick={props.onClick} />;
