import React, { useContext } from "react";
import { GameStore } from "homam/modules/store/store";
import { isSameLocation } from "homam/modules/utils";

export const Hero = () => {
  const store = useContext(GameStore);

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
        fill={
          store.player.hero.moveTo &&
          isSameLocation(store.player.hero.moveTo, store.player.hero.location)
            ? "green"
            : "white"
        }
        stroke="black"
      />
    </>
  );
};
