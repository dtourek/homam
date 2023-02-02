import React, { useContext } from "react";
import { GameStore } from "homam/modules/store/store";

interface IProps {
  x: number;
  y: number;
  color: string;
  fieldSize: number;
}

const getTileColor = (code: string) => {
  switch (code) {
    case "D":
      return "#E7E4A5";
    case "M":
      return "#1C1C1D";
    case "G":
      return "#C2F3D6";
    default:
      return "black";
  }
};

const Tile = ({ y, x, color, fieldSize }: IProps) => (
  <rect
    key={`${x},${y}`}
    x={x * fieldSize}
    y={y * fieldSize}
    height={fieldSize}
    width={fieldSize}
    fill={color}
    stroke="white"
  />
);

export const Tiles = () => {
  const store = useContext(GameStore);
  return (
    <>
      {store.map.tiles.map((row, y) => {
        return row.flatMap((tile, x) => {
          return (
            <Tile
              x={x}
              y={y}
              color={getTileColor(tile)}
              fieldSize={store.map.tileSize}
            />
          );
        });
      })}
    </>
  );
};
