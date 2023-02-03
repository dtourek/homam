import React from "react";
import { useAppSelector } from "homam/store";

export const Cursor = () => {
  const store = useAppSelector((state) => state.game);

  return (
    <rect
      width={store.map.fieldSize}
      height={store.map.fieldSize}
      x={store.cursor.location.x}
      y={store.cursor.location.y}
      fill={"white"}
      stroke="#ccc"
      fillOpacity={0.5}
    />
  );
};
