import React from 'react';
import { Unit } from './Unit';
import { IConfig } from '../App';
import { coordinatesToString, getStepCoordinates, ShortestPath, toAdjacencyList, IRawPath } from '../store/shortestPath';
import { FieldType, isObstacleField, isPathField, isPlayerField } from '../store/utils';
import { pipe } from 'fputils';
import { cutHead } from '../tools';
import { IStore } from '../store/useStore';

interface IMapProps {
  config: IConfig;
  store: IStore;
}

export interface IFieldObj {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke?: string;
}

const cutHeadPath = (raw: IRawPath): IRawPath => ({ ...raw, path: cutHead(raw.path) });

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

export const Map = ({ config: { unit }, store: { map, player, updatePlayerLocation, path, setPath, setPathWeight } }: IMapProps) => {
  const getMap = () => {
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

        if (isPathField(path, x, y)) {
          return fields.push({ x, y, height: unit, width: unit, fill: '#99D17B' });
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

  const updatePlayer = ([x, y]: string[]) => updatePlayerLocation({ x: Number(x), y: Number(y) });

  const setState = (raw: IRawPath): void => {
    setPathWeight(raw.weight);
    setPath(
      raw.path.map((step) => {
        const [stepX, stepY] = getStepCoordinates(step);
        return { x: Number(stepX), y: Number(stepY) };
      }),
    );

    pipe(getPlayerTargetLocation(raw), getStepCoordinates, updatePlayer);
  };

  const calculatePath = ({ start, end }: { start: string; end: string }) => new ShortestPath(toAdjacencyList(map)).get(start, end);

  const handleClick = (x: number, y: number) => {
    const edges = { start: coordinatesToString(player.location), end: coordinatesToString({ x, y }) };
    return pipe(edges, calculatePath, cutHeadPath, setState);
  };

  return (
    <>
      {getMap().map(({ x, y, ...props }) => (
        <Unit key={`unit-${x},${y}`} {...props} x={x * unit} y={y * unit} onUnitClick={() => handleClick(x, y)} />
      ))}
    </>
  );
};
