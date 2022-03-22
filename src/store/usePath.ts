import { useState } from 'react';
import { ILocation, IPlayer } from '../interfaces';
import { pipe } from 'fputils';

export interface IPath {
  location: ILocation;
  reachable: boolean;
}

export const usePath = () => {
  const [path, setPath] = useState<IPath[]>([]);

  const cutVisitedFields = (playerMoves: number) => path.filter((pathField, index) => index >= playerMoves);
  const updateFields =
    (maxPlayerMovement: number) =>
    (path: IPath[]): void =>
      setPath(path.map((pathField, index) => (index < maxPlayerMovement ? { ...pathField, reachable: true } : pathField)));

  const resetPath = ({ remainingMovement }: IPlayer, maxPlayerMovement: number): void =>
    pipe(maxPlayerMovement - remainingMovement, cutVisitedFields, updateFields(maxPlayerMovement));

  return { path, setPath, resetPath };
};
