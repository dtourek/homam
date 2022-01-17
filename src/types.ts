import { Store } from "./store";

export type ILocation = { x: number, y: number }

export interface IConfig {
  unit: number;
  store: Store;
  rootHtmlElement: HTMLElement
}
