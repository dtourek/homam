import React from 'react';
import { useAppSelector } from 'homam/store';

export const Path = () => {
  const player = useAppSelector((state) => state.game.player);
  const map = useAppSelector((state) => state.game.map);

  const k = map.fieldSize / 2;
  const location = player.hero.location;
  return (
    <path
      d={`M ${location.x + k} ${location.y + k} ${player.hero.path.fields.map((field) => `${field.x + k} ${field.y + k}`).join(', ')}`}
      fill="transparent"
      stroke="green"
      strokeWidth={5}
      opacity={0.5}
    />
  );
};
