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
  const { activePlayer, movePlayer, onEndTurn, increaseResource, buyArmy, players } = usePlayer(config.playerMove);
  const { path, setPath, resetPath } = usePath();

  return (
    <>
      <Control player={activePlayer} screen={screen} setScreen={setScreen} onEndTurn={onEndTurn} defaultPlayerMove={config.playerMove} resetPath={resetPath} />
      <Screens
        screen={screen}
        increaseResource={increaseResource}
        movePlayer={movePlayer}
        player={activePlayer}
        config={config}
        path={path}
        setPath={setPath}
        buyArmy={buyArmy}
        players={players}
      />
    </>
  );
};
