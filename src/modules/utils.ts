import { MouseEvent } from 'react';
import { ILocation } from 'homam/modules/store/interfaces';
import { Nullable } from 'fputils';

export const locationFromMouseEvent = (event: MouseEvent<SVGSVGElement>, cursor: ILocation, tileSize: number, svg: SVGElement | null): ILocation => {
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

export const isSameLocation = (a: ILocation, b: ILocation) => a.x === b.x && a.y === b.y;

export const cutHead = <T>(array: T[]): T[] => {
  if (array.length <= 1) return array;
  const [, ...rest] = array;
  return rest;
};

export const is = <T>(value?: Nullable<T>): value is T => !!value;
