import React from 'react';
import { Screen } from './types';
import { IPlayer } from '../player/interfaces';
import { IPath } from '../path/usePath';
import { Barracks } from '../barracks/Barracks';
import { MapScreen } from './MapScreen';
import { IUsePlayer } from '../player/usePlayer';

interface IScreensProps {
  screen: Screen;
  path: IPath[];
  setPath: (path: IPath[]) => void;
  player: IPlayer;
  increaseResource: IUsePlayer['increaseResource'];
  movePlayer: IUsePlayer['movePlayer'];
  buyArmy: IUsePlayer['buyArmy'];
}

export const Screens = ({ screen, player, increaseResource, movePlayer, path, setPath, buyArmy }: IScreensProps) => {
  if (screen === Screen.barracks) {
    return <Barracks player={player} buyArmy={buyArmy} />;
  }

  return <MapScreen player={player} increaseResource={increaseResource} movePlayer={movePlayer} path={path} setPath={setPath} />;
};
