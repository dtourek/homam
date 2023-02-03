import React from 'react';
import { useAppSelector } from 'homam/store';

export const MoveToCursor = () => {
  const store = useAppSelector((state) => state.game);
  if (!store.player.hero.moveTo) {
    return <></>;
  }
  return (
    <rect
      width={store.map.fieldSize / 2}
      height={store.map.fieldSize / 2}
      x={store.player.hero.moveTo.x + store.map.fieldSize / 4}
      y={store.player.hero.moveTo.y + store.map.fieldSize / 4}
      fill={'green'}
      stroke="#ccc"
      fillOpacity={0.5}
    />
  );
};
