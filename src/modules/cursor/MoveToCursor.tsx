import React, { useContext } from 'react';
import { GameStore } from 'homam/modules/store/store';

export const MoveToCursor = () => {
  const store = useContext(GameStore);
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
