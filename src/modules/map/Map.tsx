import React, { useContext, MouseEvent, useRef } from 'react';
import { GameDispatch, GameStore } from 'homam/modules/store/store';
import { Hero } from 'homam/modules/hero/Hero';
import { Cursor } from 'homam/modules/cursor/Cursor';
import { Fields } from 'homam/modules/field/Fields';
import { cursorMoveAction, heroMoveAction } from 'homam/modules/store/actions';

export const Map = () => {
  const store = useContext(GameStore);
  const action = useContext(GameDispatch);
  const element = useRef<SVGSVGElement>(null);

  const onMouseMove = (event: MouseEvent<SVGSVGElement>): void => {
    if (!element.current) {
      return;
    }

    const bounding = element.current.getBoundingClientRect();

    const mapXPosition = event.clientX - bounding.left;
    const mapYPosition = event.clientY - bounding.top;
    // right
    if (mapXPosition - store.cursor.location.x > store.map.fieldSize) {
      const x = Math.round(mapXPosition / store.map.fieldSize) * store.map.fieldSize;
      action(cursorMoveAction({ x, y: store.cursor.location.y }));
    } else if (mapXPosition < store.cursor.location.x) {
      // left
      const x = Math.floor(mapXPosition / store.map.fieldSize) * store.map.fieldSize;
      action(cursorMoveAction({ x, y: store.cursor.location.y }));
    } else if (mapYPosition - store.cursor.location.y > store.map.fieldSize) {
      // down
      const y = Math.round(mapYPosition / store.map.fieldSize) * store.map.fieldSize;
      action(cursorMoveAction({ x: store.cursor.location.x, y }));
    } else if (mapYPosition < store.cursor.location.y) {
      // up
      const y = Math.floor(mapYPosition / store.map.fieldSize) * store.map.fieldSize;
      action(cursorMoveAction({ x: store.cursor.location.x, y }));
    }
  };

  const onClick = (event: MouseEvent<SVGSVGElement>) => {
    // const bounding = element.current.getBoundingClientRect()
    //todo: calculate real position
    // hero(moveAction([event.clientX - bounding.left, event.clientY - bounding.top]))
    action(heroMoveAction({ x: store.cursor.location.x, y: store.cursor.location.y }));
  };

  return (
    <svg ref={element} xmlns="http://www.w3.org/store.map.tileSize00/svg" height={store.map.maxSize} width={store.map.maxSize} onMouseMove={onMouseMove} onClick={onClick}>
      <Fields />
      <Hero />
      <Cursor />
    </svg>
  );
};
