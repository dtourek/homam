import { IGameStore } from "homam/modules/store/store";

export const initialGameStore: IGameStore = {
  player: { hero: { location: { x: 0, y: 0 }, id: 1, name: "John" } },
  cursor: { location: { x: 0, y: 0 } },
  map: {
    maxSize: 240,
    tileSize: 20,
    tiles: [
      ["D", "M", "M", "G", "G", "G", "G", "G", "G", "D", "D", "D"],
      ["G", "G", "G", "M", "M", "G", "G", "G", "G", "D", "D", "D"],
      ["M", "M", "G", "M", "G", "G", "G", "G", "G", "M", "M", "M"],
      ["M", "G", "G", "M", "G", "M", "G", "G", "G", "M", "M", "M"],
      ["G", "G", "G", "G", "G", "M", "G", "G", "G", "M", "M", "M"],
      ["M", "M", "G", "G", "M", "M", "G", "G", "G", "M", "M", "M"],
      ["M", "M", "G", "G", "M", "M", "G", "G", "G", "D", "D", "G"],
      ["G", "G", "G", "G", "G", "G", "G", "G", "G", "D", "G", "G"],
      ["M", "M", "G", "G", "G", "G", "D", "D", "G", "G", "G", "G"],
      ["M", "M", "G", "G", "G", "G", "D", "D", "G", "G", "G", "G"],
      ["M", "M", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
      ["M", "M", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
    ],
  },
};
