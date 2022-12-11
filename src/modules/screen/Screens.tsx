import React from 'react';
import { Screen } from './types';
import { IPlayer } from '../player/interfaces';
import { IConfig } from '../../interfaces';
import { IPath } from '../path/usePath';
import { Barracks } from '../barracks/Barracks';
import { MapScreen } from './MapScreen';
import { IUsePlayer } from '../player/usePlayer';

interface IScreensProps {
  screen: Screen;
  config: IConfig;
  path: IPath[];
  setPath: (path: IPath[]) => void;
  player: IPlayer;
  increaseResource: IUsePlayer['increaseResource'];
  movePlayer: IUsePlayer['movePlayer'];
  buyArmy: IUsePlayer['buyArmy'];
}

export const Screens = ({ screen, player, config, increaseResource, movePlayer, path, setPath, buyArmy }: IScreensProps) => {
  if (screen === Screen.barracks) {
    return <Barracks player={player} buyArmy={buyArmy} />;
  }

  return <MapScreen config={config} player={player} increaseResource={increaseResource} movePlayer={movePlayer} path={path} setPath={setPath} />;
};
