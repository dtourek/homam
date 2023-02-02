import { MouseEvent } from "react";
import { ILocation } from "homam/modules/store/store";

export const locationFromMouseEvent = (
  event: MouseEvent<SVGSVGElement>,
  cursor: ILocation,
  tileSize: number,
  svg: SVGElement | null
): ILocation => {
  const bounding = svg?.getBoundingClientRect();
  if (!bounding) {
    return cursor;
  }

  const mapXPosition = event.clientX - bounding.left;
  const mapYPosition = event.clientY - bounding.top;

  const x = Math.floor(mapXPosition / tileSize) * tileSize;
  const y = Math.floor(mapYPosition / tileSize) * tileSize;

  return { x, y };
};
