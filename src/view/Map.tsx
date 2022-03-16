import React from 'react';
import { Unit } from './Unit';
import { IContext } from '../App';
import { coordinatesToString, getCoordinates, ShortestPath, toAdjacencyList } from '../store/shortestPath';
import { FieldType, isObstacleField, isPathField, isPlayerField } from '../store/utils';
import { pipe } from 'fputils';
import { cutHead } from '../tools';
import { useStore } from '../store/useStore';

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

interface IMapProps {
  context: IContext;
}

export interface IUnit {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke?: string;
}

export const Map = ({ context }: IMapProps) => {
  const { player, map, updatePlayerLocation, path, setPath } = useStore();

  const getMap = () => {
    const toReturn: IUnit[] = [];

    map.forEach((row, y) =>
      row.forEach((field, x) => {
        const fill = getFieldColor(field.type);

        if (isPlayerField({ x, y }, player)) {
          return toReturn.push({ x, y, height: context.unit, width: context.unit, fill: 'red' });
        }

        if (isObstacleField(field)) {
          return toReturn.push({ x, y, height: context.unit, width: context.unit, fill, stroke: 'white' });
        }
        // TODO - improve path rendering.
        if (isPathField(path, x, y)) {
          return toReturn.push({ x, y, height: context.unit, width: context.unit, fill: '#99D17B' });
        }

        return toReturn.push({ x, y, height: context.unit, width: context.unit, fill });
      }),
    );

    return toReturn;
  };

  return (
    <>
      {getMap().map(({ x, y, ...props }) => (
        <Unit
          key={`unit-${x},${y}`}
          {...props}
          x={x * context.unit}
          y={y * context.unit}
          onUnitClick={() => {
            const shortestPath = pipe(new ShortestPath(toAdjacencyList(map)).get(coordinatesToString(player.location), coordinatesToString({ x, y })), cutHead);

            setPath(
              shortestPath.map((path) => {
                const [pathX, pathY] = getCoordinates(path);
                return { x: Number(pathX), y: Number(pathY) };
              }),
            );

            updatePlayerLocation({ x, y });
          }}
        />
      ))}
    </>
  );
};
