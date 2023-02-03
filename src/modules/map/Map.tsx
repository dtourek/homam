import React, { useContext, MouseEvent, useRef } from 'react';
import { GameDispatch, GameStore } from 'homam/modules/store/store';
import { Hero } from 'homam/modules/hero/Hero';
import { Cursor } from 'homam/modules/cursor/Cursor';
import { Fields } from 'homam/modules/field/Fields';
import { GameStoreActions } from 'homam/modules/store/actions';
import { locationFromMouseEvent } from 'homam/modules/utils';
import { MoveToCursor } from 'homam/modules/cursor/MoveToCursor';

export const Map = () => {
  const store = useContext(GameStore);
  const action = useContext(GameDispatch);
  const element = useRef<SVGSVGElement>(null);

  const onMouseMove = (event: MouseEvent<SVGSVGElement>): void => {
    const location = locationFromMouseEvent(event, store.cursor.location, store.map.fieldSize, element.current);
    if (store.cursor.location.x !== location.x || store.cursor.location.y !== location.y) {
      action({
        type: GameStoreActions.cursorMove,
        location,
      });
    }
  };

  const onMouseDown = (event: MouseEvent<SVGSVGElement>) => {
    const location = locationFromMouseEvent(event, store.cursor.location, store.map.fieldSize, element.current);
    action({
      type: GameStoreActions.heroMoveStart,
      location,
    });
  };

  return (
    <svg ref={element} xmlns="http://www.w3.org/store.map.tileSize00/svg" height={store.map.maxSize} width={store.map.maxSize} onMouseMove={onMouseMove} onMouseDown={onMouseDown}>
      <Fields />
      <Hero />
      <Cursor />
      <MoveToCursor />
    </svg>
  );
};
