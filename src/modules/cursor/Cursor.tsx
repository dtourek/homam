import React, { useContext } from 'react';
import { GameStore } from 'homam/modules/store/store';

export const Cursor = () => {
  const store = useContext(GameStore);
  return <rect width={store.map.fieldSize} height={store.map.fieldSize} x={store.cursor.location.x} y={store.cursor.location.y} fill={'white'} stroke="#ccc" fillOpacity={0.5} />;
};
