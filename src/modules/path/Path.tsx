import React, { Fragment, useContext } from 'react';
import { GameStore } from 'homam/modules/store/store';
import { isSameLocation } from 'homam/modules/utils';

export const Path = () => {
  const store = useContext(GameStore);
  return (
    <>
      {store.player.hero.path.fields.map((field) => {
        if (isSameLocation({ x: field.x, y: field.y }, store.player.hero.location)) {
          return null;
        }
        return (
          <Fragment key={`${field.x}-${field.y}`}>
            <rect width={store.map.fieldSize} height={store.map.fieldSize} x={field.x} y={field.y} fill={field.color} />
            <rect
              width={store.map.fieldSize / 2}
              height={store.map.fieldSize / 2}
              x={field.x + store.map.fieldSize / 4}
              y={field.y + store.map.fieldSize / 4}
              fill={'blue'}
              stroke="black"
            />
          </Fragment>
        );
      })}
    </>
  );
};
