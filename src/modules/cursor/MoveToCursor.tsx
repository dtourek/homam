import React from 'react';
import { useAppSelector } from 'homam/store';

export const MoveToCursor = () => {
  const store = useAppSelector((state) => state.game);
  if (!store.player.hero.moveTo) {
    return <></>;
  }

  const moveTo = store.player.hero.moveTo;
  const fieldSize = store.map.fieldSize;
  const off = fieldSize / 4;
  return (
    <>
      <line x1={moveTo.x + off} y1={moveTo.y + off} x2={moveTo.x + fieldSize - off} y2={moveTo.y + fieldSize - off} stroke="green" strokeWidth={5} opacity={0.5} />
      <line x1={moveTo.x + fieldSize - off} y1={moveTo.y + off} x2={moveTo.x + off} y2={moveTo.y + fieldSize - off} stroke="green" strokeWidth={5} opacity={0.5} />
    </>
  );
};
