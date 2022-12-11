import { IConfig } from '../../interfaces';
import { ILocation, IPlayer } from '../player/interfaces';
import { IResourceField } from '../resources/interfaces';
import { WorldMap } from '../map/interfaces';
import { IPath } from '../path/usePath';
import React, { useState } from 'react';
import { IRawPath } from '../path/interfaces';
import { coordinatesToString, getStepCoordinates, ShortestPath, toAdjacencyList } from '../path/shortestPath';
import { cutHead, is, tail } from '../../tools';
import { pipe } from 'tabor';
import { isResourceField } from '../resources/utils';
import { Map } from '../map/Map';
import { IUsePlayer } from '../player/usePlayer';

interface IMapScreenProps {
  config: IConfig;
  player: IPlayer;
  increaseResource: IUsePlayer['increaseResource'];
  movePlayer: IUsePlayer['movePlayer'];
  path: IPath[];
  setPath: (path: IPath[]) => void;
}

const cutHeadPath = (raw: IRawPath): IRawPath => ({ ...raw, path: cutHead(raw.path) });
const pathFieldsEquals = (rawField: string, field: IPath): boolean => {
  const [fieldX, fieldY] = getStepCoordinates(rawField);
  return Number(fieldX) === field?.location.x && Number(fieldY) === field?.location.y;
};

const getRemainingMovement = (player: IPlayer, raw: IRawPath): number => (player.remainingMovement - raw.weight >= 0 ? player.remainingMovement - raw.weight : 0);
const getShortestPath =
  (map: WorldMap) =>
  ({ start, end }: { start: string; end: string }): IRawPath =>
    new ShortestPath(toAdjacencyList(map)).get(start, end);

const getResources = (config: IConfig): IResourceField[] =>
  config.map.flatMap((row, y) => row.map((field, x) => (field.resource ? { ...field, location: { x, y } } : undefined))).filter(is);

const getPlayerTargetLocation = (raw: IRawPath, player: IPlayer): string => {
  if (raw.path.length < player.remainingMovement) {
    return raw.path[raw.path.length - 1];
  }
  return raw.path[player.remainingMovement - 1];
};
const toLocation = ([x, y]: string[]): ILocation => ({ x: Number(x), y: Number(y) });

export const MapScreen = ({ config, player, increaseResource, movePlayer, path, setPath }: IMapScreenProps) => {
  const [resources, setResources] = useState<IResourceField[]>(getResources(config));

  const update = (rawPath: IRawPath): void => {
    setPath(
      rawPath.path.map((step, index) => {
        const [stepX, stepY] = getStepCoordinates(step);
        return { location: { x: Number(stepX), y: Number(stepY) }, reachable: index < player.remainingMovement };
      }),
    );

    if (player.remainingMovement > 0) {
      if (pathFieldsEquals(tail(rawPath.path), tail(path))) {
        const targetLocation = pipe(getPlayerTargetLocation(rawPath, player), getStepCoordinates, toLocation);

        const field = config.map[targetLocation.y][targetLocation.x];
        if (isResourceField(field)) {
          setResources(resources.filter((resource) => targetLocation.x !== resource.location.x && targetLocation.y !== resource.location.y));
          increaseResource(field.resource);
        }

        movePlayer(targetLocation, getRemainingMovement(player, rawPath), config.map);
      }
    }
  };

  const handleClick = (x: number, y: number): void => {
    const edges = { start: coordinatesToString(player.location), end: coordinatesToString({ x, y }) };
    pipe(edges, getShortestPath(config.map), cutHeadPath, update);
  };

  return <Map config={config} player={player} path={path} onFieldClick={handleClick} resources={resources} />;
};
