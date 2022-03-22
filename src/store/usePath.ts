import { useState } from 'react';
import { ILocation, IPlayer } from '../interfaces';
import { pipe } from 'fputils';

export interface IPath {
  location: ILocation;
  reachable: boolean;
}

export const usePath = () => {
  const [path, setPath] = useState<IPath[]>([]);

  const cutVisitedFields = (playerMoves: number): IPath[] => path.filter((pathField, index) => index >= playerMoves);
  const updateFields =
    (defaultMovement: number) =>
    (path: IPath[]): void =>
      setPath(path.map((pathField, index) => (index < defaultMovement ? { ...pathField, reachable: true } : pathField)));

  const resetPath = ({ remainingMovement }: IPlayer, defaultMovement: number): void => pipe(defaultMovement - remainingMovement, cutVisitedFields, updateFields(defaultMovement));

  return { path, setPath, resetPath };
};
