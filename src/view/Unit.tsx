import {IUnit} from "./Map";
import {MouseEvent} from "react";

interface IProps extends IUnit {
  onUnitClick: (event: MouseEvent) => void
}

export const Unit = (props: IProps) => <rect key={`${props.x},${props.y}`} {...props} onClick={props.onUnitClick} />
