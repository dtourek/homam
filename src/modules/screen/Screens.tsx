import React from 'react';
import { Screen } from './types';
import { IPlayer } from '../player/interfaces';
import { IConfig } from '../../interfaces';
import { IPath } from '../path/usePath';
import { Barracks } from '../barracks/Barracks';
import { MapScreen } from './MapScreen';
import { IUsePlayer } from '../player/usePlayer';
import { Battlefield } from '../battlefield/Battlefield';

interface IScreensProps {
  screen: Screen;
  config: IConfig;
  path: IPath[];
  setPath: (path: IPath[]) => void;
  player: IPlayer;
  increaseResource: IUsePlayer['increaseResource'];
  movePlayer: IUsePlayer['movePlayer'];
  buyArmy: IUsePlayer['buyArmy'];
  players: IPlayer[];
}

export const Screens = ({ screen, player, config, increaseResource, movePlayer, path, setPath, buyArmy, players }: IScreensProps) => {
  if (screen === Screen.barracks) {
    return <Barracks player={player} buyArmy={buyArmy} />;
  }

  if (screen === Screen.battle) {
    return <Battlefield armies={players.map((player) => player.army)} />;
  }

  return <MapScreen config={config} player={player} increaseResource={increaseResource} movePlayer={movePlayer} path={path} setPath={setPath} />;
};
