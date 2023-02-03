import React, { MouseEvent, useContext, useRef } from 'react';
import { GameDispatch, GameStore } from 'homam/modules/store/store';
import { Hero } from 'homam/modules/hero/Hero';
import { Cursor } from 'homam/modules/cursor/Cursor';
import { Fields } from 'homam/modules/field/Fields';
import { cursorMoveAction, GameStoreActions, heroPathAction } from 'homam/modules/store/actions';
import { cutHead, locationFromMouseEvent } from 'homam/modules/utils';
import { getStepCoordinates, ShortestPath, toAdjacencyList } from 'homam/modules/path/shortestPath';
import { IRawPath } from 'homam/modules/path/interfaces';
import { IField } from 'homam/modules/store/interfaces';
import { pipe } from 'fputils';
import { ILocation } from '../../../_OLD/src/modules/player/interfaces';
import { MoveToCursor } from 'homam/modules/cursor/MoveToCursor';
import { Path } from 'homam/modules/path/Path';

export const coordinatesToString = (location: ILocation, fieldSize: number): string => `${location.x / fieldSize},${location.y / fieldSize}`;

const getShortestPath =
  (fields: IField[][]) =>
  ({ start, end }: { start: string; end: string }): IRawPath => {
    return new ShortestPath(toAdjacencyList(fields)).get(start, end);
  };
const cutHeadPath = (raw: IRawPath): IRawPath => ({ ...raw, path: cutHead(raw.path) });
const pathToFields = (rawPath: IRawPath, fields: IField[][], fieldSize: number): IField[] =>
  rawPath.path
    .map((rawField) => {
      const { x, y } = getStepCoordinates(rawField);
      return fields[y][x];
    })
    .map((field) => ({ ...field, x: field.x * fieldSize, y: field.y * fieldSize }));

export const Map = () => {
  const element = useRef<SVGSVGElement>(null);
  const cursor = useAppSelector((state) => state.game.cursor);
  const map = useAppSelector((state) => state.game.map);

  const dispatch = useAppDispatch();

  const onMouseMove = (event: MouseEvent<SVGSVGElement>): void => {
    const location = locationFromMouseEvent(event, cursor.location, map.fieldSize, element.current);
    if (cursor.location.x !== location.x || cursor.location.y !== location.y) {
      dispatch(cursorMove(location));
    }
  };

  const onMouseDown = (event: MouseEvent<SVGSVGElement>) => {
    const location = locationFromMouseEvent(event, store.cursor.location, store.map.fieldSize, element.current);
    dispatch(heroMoveStart(location));

    const edges = { start: coordinatesToString(store.player.hero.location, store.map.fieldSize), end: coordinatesToString(location, store.map.fieldSize) };
    const path = pipe(edges, getShortestPath(store.map.fields), cutHeadPath);
    action(heroPathAction({ fields: pathToFields(path, store.map.fields, store.map.fieldSize), weight: path.weight }));
  };

  return (
    <svg ref={element} xmlns="http://www.w3.org/store.map.tileSize00/svg" height={store.map.maxSize} width={store.map.maxSize} onMouseMove={onMouseMove} onMouseDown={onMouseDown}>
      <Fields />
      <Path />
      <Hero />
      <Cursor />
      <MoveToCursor />
    </svg>
  );
};
