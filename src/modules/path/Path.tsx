import React, { Fragment } from 'react';
import { isSameLocation } from 'homam/modules/utils';
import { useAppSelector } from 'homam/store';

export const Path = () => {
  const player = useAppSelector((state) => state.game.player);
  const map = useAppSelector((state) => state.game.map);

  return (
    <>
      {player.hero.path.fields.map((field) => {
        if (isSameLocation({ x: field.x, y: field.y }, player.hero.location)) {
          return null;
        }
        return (
          <Fragment key={`${field.x}-${field.y}`}>
            <rect width={map.fieldSize} height={map.fieldSize} x={field.x} y={field.y} fill={field.color} />
            <rect width={map.fieldSize / 2} height={map.fieldSize / 2} x={field.x + map.fieldSize / 4} y={field.y + map.fieldSize / 4} fill={'blue'} stroke="black" />
          </Fragment>
        );
      })}
    </>
  );
};
