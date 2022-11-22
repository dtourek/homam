import React, { useState } from 'react';
import { IConfig } from '../../interfaces';
import { IPath, usePath } from '../path/usePath';
import { Resources } from '../resources/Resources';
import { usePlayer } from '../player/usePlayer';
import { useTime } from '../time/useTime';
import { Map } from '../map/Map';
import { IRawPath } from '../path/interfaces';
import { coordinatesToString, getStepCoordinates, ShortestPath, toAdjacencyList } from '../path/shortestPath';
import { cutHead, is, tail } from '../../tools';
import { pipe } from 'tabor';
import { isResourceField } from '../resources/utils';
import { ILocation, IPlayer } from '../player/interfaces';
import { WorldMap } from '../map/interfaces';
import { IResourceField } from '../resources/interfaces';

interface IMainProps {
  config: IConfig;
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

export const MainScreen = ({ config }: IMainProps) => {
  const { day, increaseDay } = useTime();
  const { player, movePlayer, onEndTurn, increaseResource } = usePlayer(config.playerMove);
  const { path, setPath, resetPath } = usePath();
  const [resources, setResources] = useState<IResourceField[]>(getResources(config));

  const endTurn = () => {
    increaseDay();
    resetPath(player, config.playerMove);
    onEndTurn({ gold: 1000, rock: 10, wood: 5 });
  };

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

  return (
    <>
      <Resources resources={player.resources} />
      <p>Remaining player move: {player.remainingMovement}</p>
      <p>Days: {day}</p>
      <button onClick={endTurn}>End turn</button>
      <br />
      <Map config={config} player={player} path={path} onFieldClick={handleClick} resources={resources} />
    </>
  );
};
