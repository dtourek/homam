import React, { useState } from 'react';
import { Field } from './Field';
import { IConfig } from '../../interfaces';
import { IUserPlayer } from '../player/usePlayer';
import { IPath } from '../path/usePath';
import { coordinatesToString, getStepCoordinates, ShortestPath, toAdjacencyList } from '../path/shortestPath';
import { cutHead, is, tail } from '../../tools';
import { FieldType, IField } from './interfaces';
import { isObstacleField } from './utils';
import { pipe } from 'tabor';
import { ILocation, IPlayer } from '../player/interfaces';
import { IRawPath } from '../path/interfaces';
import { getResourceFieldColor, isResourceField } from '../resources/utils';
import { isPlayerField } from '../player/utils';
import { IMapResource } from '../resources/interfaces';

interface IMapProps {
  config: IConfig;
  player: IPlayer;
  movePlayer: IUserPlayer['movePlayer'];
  path: IPath[];
  setPath: (path: IPath[]) => void;
  increaseResource: (resource: IMapResource) => void;
}

export interface IFieldObj {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke?: string;
}

const getPathField = (path: IPath[], x: number, y: number): IPath | undefined => path.find(({ location }) => location.x === x && location.y === y);
const cutHeadPath = (raw: IRawPath): IRawPath => ({ ...raw, path: cutHead(raw.path) });
const pathFieldsEquals = (rawField: string, field: IPath): boolean => {
  const [fieldX, fieldY] = getStepCoordinates(rawField);
  return Number(fieldX) === field?.location.x && Number(fieldY) === field?.location.y;
};

const getRemainingMovement = (player: IPlayer, raw: IRawPath): number => (player.remainingMovement - raw.weight >= 0 ? player.remainingMovement - raw.weight : 0);

// https://coolors.co/020c16-1c1c1d-092c0f-789d99-e7e4a5-c2f3d6-c6b897
const getFieldSurfaceColor = (type: FieldType): string => {
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

interface IResource extends IField {
  location: ILocation;
}

const getResourceField = (resources: IResource[], currentLocation: ILocation) =>
  resources.find((resource) => resource.location.x === currentLocation.x && resource.location.y === currentLocation.y);

// TODO - move to state
const getFields = ({ unit, map }: IConfig, player: IPlayer, path: IPath[], resources: IResource[]): IFieldObj[] => {
  const fields: IFieldObj[] = [];

  map.forEach((row, y) =>
    row.forEach((field, x) => {
      const fill = getFieldSurfaceColor(field.type);

      if (isPlayerField({ x, y }, player)) {
        return fields.push({ x, y, height: unit, width: unit, fill: 'red' });
      }

      if (isObstacleField(field)) {
        return fields.push({ x, y, height: unit, width: unit, fill, stroke: 'white' });
      }

      const pathField = getPathField(path, x, y);
      if (pathField) {
        return fields.push({ x, y, height: unit, width: unit, fill: pathField.reachable ? '#99D17B' : '#F7E67D' });
      }

      const resourceField = getResourceField(resources, { x, y });
      if (resourceField?.resource) {
        return fields.push({ x, y, height: unit, width: unit, fill: getResourceFieldColor(resourceField.resource) });
      }

      return fields.push({ x, y, height: unit, width: unit, fill });
    }),
  );

  return fields;
};

const getResources = (config: IConfig): IResource[] =>
  config.map.flatMap((row, y) => row.map((field, x) => (field.resource ? { ...field, location: { x, y } } : undefined))).filter(is);

export const Map = ({ config, player, movePlayer, path, setPath, increaseResource }: IMapProps) => {
  const [resources, setResources] = useState<IResource[]>(getResources(config));

  const getPlayerTargetLocation = (raw: IRawPath): string => {
    if (raw.path.length < player.remainingMovement) {
      return raw.path[raw.path.length - 1];
    }
    return raw.path[player.remainingMovement - 1];
  };

  const playerLocation = ([x, y]: string[]) => ({ x: Number(x), y: Number(y) });

  const update = (rawPath: IRawPath): void => {
    setPath(
      rawPath.path.map((step, index) => {
        const [stepX, stepY] = getStepCoordinates(step);
        return { location: { x: Number(stepX), y: Number(stepY) }, reachable: index < player.remainingMovement };
      }),
    );

    if (player.remainingMovement > 0) {
      if (pathFieldsEquals(tail(rawPath.path), tail(path))) {
        const targetLocation = pipe(getPlayerTargetLocation(rawPath), getStepCoordinates, playerLocation);

        const field = config.map[targetLocation.y][targetLocation.x];
        if (isResourceField(field)) {
          setResources(resources.filter((resource) => targetLocation.x !== resource.location.x && targetLocation.y !== resource.location.y));
          increaseResource(field.resource);
        }

        movePlayer(targetLocation, getRemainingMovement(player, rawPath), config.map);
      }
    }
  };

  const getShortestPath = ({ start, end }: { start: string; end: string }): IRawPath => new ShortestPath(toAdjacencyList(config.map)).get(start, end);

  const handleClick = (x: number, y: number): void => {
    const edges = { start: coordinatesToString(player.location), end: coordinatesToString({ x, y }) };
    pipe(edges, getShortestPath, cutHeadPath, update);
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={config.mapMaxSize} width={config.mapMaxSize}>
      {getFields(config, player, path, resources).map(({ x, y, ...props }) => (
        <Field key={`unit-${x},${y}`} {...props} x={x * config.unit} y={y * config.unit} onClick={() => handleClick(x, y)} />
      ))}
    </svg>
  );
};
