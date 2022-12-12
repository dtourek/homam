import React, { useState } from 'react';
import { IConfig } from '../../interfaces';
import { usePath } from '../path/usePath';
import { usePlayer } from '../player/usePlayer';
import { Screen } from './types';
import { Control } from './Control';
import { Screens } from './Screens';

interface IMainScreenProps {
  config: IConfig;
}

export const MainScreen = ({ config }: IMainScreenProps) => {
  const [screen, setScreen] = useState<Screen>(Screen.map);
  const { player, movePlayer, onEndTurn, increaseResource, buyArmy } = usePlayer(config.playerMove);
  const { path, setPath, resetPath } = usePath();

  return (
    <>
      <Control player={player} screen={screen} setScreen={setScreen} onEndTurn={onEndTurn} defaultPlayerMove={config.playerMove} resetPath={resetPath} />
      <Screens screen={screen} increaseResource={increaseResource} movePlayer={movePlayer} player={player} config={config} path={path} setPath={setPath} buyArmy={buyArmy} />
    </>
  );
};
