import { isObstacleField } from './map/field';
import { IPlayer } from './player/player';
import { Store } from './store';
import { IConfig, ILocation } from './types';

type HTMLAttributes = { [key: string]: string };

const mapHTMLAttributes = (attributes: HTMLAttributes, htmlElememnt: SVGSVGElement | SVGRectElement) =>
  Object.entries(attributes).forEach(([key, value]) => htmlElememnt.setAttribute(key, value));

const createRect = (attributes: HTMLAttributes) => {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  mapHTMLAttributes(attributes, rect);
  return rect;
};

export const createSvgContainer = (attributes: HTMLAttributes): SVGSVGElement => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  mapHTMLAttributes(attributes, svg);
  return svg;
};

const isPlayerOnField = (location: ILocation, player: IPlayer): boolean => location.x === player.location.x && location.y === player.location.y;
const renderUnit =
  (svgParent: SVGSVGElement, unit: IConfig['unit'], x: ILocation['x'], y: ILocation['y']) =>
  (fill: string): SVGRectElement =>
    svgParent.appendChild(createRect({ x: `${x * unit}`, y: `${y * unit}`, width: `${unit}`, height: `${unit}`, fill }));

export const render = (store: Store, svgParent: SVGSVGElement, unit: number) => {
  store.getMap().forEach((row, y) =>
    row.forEach((field, x) => {
      const unitElement = renderUnit(svgParent, unit, x, y);

      if (isPlayerOnField({ x, y }, store.getPlayer())) {
        return unitElement('red');
      }

      if (isObstacleField(field)) {
        return unitElement('#ccc');
      }

      return unitElement('#eee');
    }),
  );
};
