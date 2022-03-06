import { coordinatesToString, Dijkstra, getCoordinates, toAdjacencyList } from './dijkstra';
import { renderNow } from './index';
import { FieldType, isObstacleField } from './map/field';
import { Store } from './store';
import { IConfig, ILocation, IPlayer } from './types';

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

const isPlayerField = (location: ILocation, player: IPlayer): boolean => location.x === player.location.x && location.y === player.location.y;

const getUnit =
  (svgParent: SVGSVGElement, unit: IConfig['unit'], x: ILocation['x'], y: ILocation['y']) =>
  (attribuites: HTMLAttributes): SVGRectElement => {
    const element = createRect({ x: `${x * unit}`, y: `${y * unit}`, width: `${unit}`, height: `${unit}`, ...attribuites });
    return element;
  };

// https://coolors.co/020c16-1c1c1d-092c0f-789d99-e7e4a5-c2f3d6-c6b897
const getFieldColor = (type: FieldType): string => {
  switch (type) {
    case FieldType.mud:
      return '#C6B897';
    case FieldType.grass:
      return '#C2F3D6';
    case FieldType.desert:
      return '#E7E4A5';
    case FieldType.swamp:
      return '#789D99';
    case FieldType.forest:
      return '#092C0F';
    case FieldType.mountain:
      return '#1C1C1D';
    case FieldType.water:
      return '#09192A';
    default:
      return '#000';
  }
};

export const getSvgMap = (store: Store, svgParent: SVGSVGElement, unit: number, toRender: SVGRectElement[] = []): SVGRectElement[] => {
  store.getMap().forEach((row, y) =>
    row.forEach((field, x) => {
      const unitElement = getUnit(svgParent, unit, x, y);
      const color = getFieldColor(field.type);

      if (isPlayerField({ x, y }, store.getPlayer())) {
        return toRender.push(unitElement({ fill: color }));
      }

      if (isObstacleField(field)) {
        return toRender.push(unitElement({ fill: color, stroke: 'white' }));
      }

      const moveAbleField = unitElement({ fill: color });
      moveAbleField.style.cursor = 'pointer';

      moveAbleField.addEventListener('click', () => {
        const playerLocation = store.getPlayer().location;
        const shortestPath = new Dijkstra(toAdjacencyList(store.getMap())).dijkstra(coordinatesToString(playerLocation.x, playerLocation.y), coordinatesToString(x, y));

        const fieldsShortestPath = shortestPath.map((step) => {
          const [x, y] = getCoordinates(step);
          const pathField = getUnit(svgParent, unit, Number(x), Number(y))({ fill: '#99D17B' });
          pathField.style.cursor = 'pointer';
          return pathField;
        });

        return renderNow(svgParent, toRender.concat(fieldsShortestPath));
      });

      toRender.push(moveAbleField);
    }),
  );

  return toRender;
};
