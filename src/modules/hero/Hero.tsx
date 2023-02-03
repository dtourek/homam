import React from "react";
import { isSameLocation } from "homam/modules/utils";
import { useAppSelector } from "homam/store";

export const Hero = () => {
  const store = useAppSelector((state) => state.game);

  const isMoving =
    store.player.hero.moveTo &&
    !isSameLocation(store.player.hero.moveTo, store.player.hero.location);
  return (
    <>
      <rect
        width={store.map.fieldSize}
        height={store.map.fieldSize}
        x={store.player.hero.location.x}
        y={store.player.hero.location.y}
        fill={"grey"}
      />
      <rect
        width={store.map.fieldSize / 2}
        height={store.map.fieldSize / 2}
        x={store.player.hero.location.x + store.map.fieldSize / 4}
        y={store.player.hero.location.y + store.map.fieldSize / 4}
        fill={isMoving ? "green" : "white"}
        stroke="black"
      />
    </>
  );
};
