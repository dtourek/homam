import React from 'react';
import { Field } from './Field';
import { IConfig, ILocation, IPlayer } from '../../interfaces';
import { coordinatesToString, getStepCoordinates, ShortestPath, toAdjacencyList, IRawPath } from '../../store/shortestPath';
import { FieldType, isObstacleField } from '../../store/utils';
import { pipe } from 'fputils';
import { cutHead, tail } from '../../tools';
import { IPath } from '../../store/usePath';
import { IUserPlayer } from '../../store/player/usePlayer';

interface IMapProps {
  config: IConfig;
  player: IPlayer;
  movePlayer: IUserPlayer['movePlayer'];
  path: IPath[];
  setPath: (path: IPath[]) => void;
}

export interface IFieldObj {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke?: string;
}

const isPlayerField = (location: ILocation, player: IPlayer): boolean => location.x === player.location.x && location.y === player.location.y;
const pathFieldIndex = (path: IPath[], x: number, y: number): IPath | undefined => path.find(({ location }) => location.x === x && location.y === y);
const cutHeadPath = (raw: IRawPath): IRawPath => ({ ...raw, path: cutHead(raw.path) });
const pathFieldsEquals = (rawField: string, field: IPath): boolean => {
  const [fieldX, fieldY] = getStepCoordinates(rawField);
  return Number(fieldX) === field?.location.x && Number(fieldY) === field?.location.y;
};

const getRemainingMovement = (player: IPlayer, raw: IRawPath): number => (player.remainingMovement - raw.weight >= 0 ? player.remainingMovement - raw.weight : 0);

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

export const Map = ({ config: { unit, map, mapMaxSize }, player, movePlayer, path, setPath }: IMapProps) => {
  const getFields = (): IFieldObj[] => {
    const fields: IFieldObj[] = [];

    map.forEach((row, y) =>
      row.forEach((field, x) => {
        const fill = getFieldColor(field.type);

        if (isPlayerField({ x, y }, player)) {
          return fields.push({ x, y, height: unit, width: unit, fill: 'red' });
        }

        if (isObstacleField(field)) {
          return fields.push({ x, y, height: unit, width: unit, fill, stroke: 'white' });
        }

        const pathField = pathFieldIndex(path, x, y);
        if (pathField) {
          return fields.push({ x, y, height: unit, width: unit, fill: pathField.reachable ? '#99D17B' : '#F7E67D' });
        }

        return fields.push({ x, y, height: unit, width: unit, fill });
      }),
    );

    return fields;
  };

  const getPlayerTargetLocation = (raw: IRawPath): string => {
    if (raw.path.length < player.remainingMovement) {
      return raw.path[raw.path.length - 1];
    }
    return raw.path[player.remainingMovement - 1];
  };

  const playerLocation = ([x, y]: string[]) => ({ x: Number(x), y: Number(y) });

  const setState = (raw: IRawPath): void => {
    if (player.remainingMovement > 0) {
      setPath(
        raw.path.map((step, index) => {
          const [stepX, stepY] = getStepCoordinates(step);
          return { location: { x: Number(stepX), y: Number(stepY) }, reachable: index < player.remainingMovement };
        }),
      );

      if (pathFieldsEquals(tail(raw.path), tail(path))) {
        const location = pipe(getPlayerTargetLocation(raw), getStepCoordinates, playerLocation);
        movePlayer(location, getRemainingMovement(player, raw), map);
      }
    }
  };

  const getShortestPath = ({ start, end }: { start: string; end: string }): IRawPath => new ShortestPath(toAdjacencyList(map)).get(start, end);

  const handleClick = (x: number, y: number): void => {
    const edges = { start: coordinatesToString(player.location), end: coordinatesToString({ x, y }) };
    pipe(edges, getShortestPath, cutHeadPath, setState);
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={mapMaxSize} width={mapMaxSize}>
      {getFields().map(({ x, y, ...props }) => (
        <Field key={`unit-${x},${y}`} {...props} x={x * unit} y={y * unit} onClick={() => handleClick(x, y)} />
      ))}
    </svg>
  );
};
