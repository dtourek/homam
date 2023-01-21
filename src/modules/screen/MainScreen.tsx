import React, { useState } from 'react';
import { usePath } from '../path/usePath';
import { usePlayer } from '../player/usePlayer';
import { Screen } from './types';
import { Control } from './Control';
import { Screens } from './Screens';

export const MainScreen = () => {
  const [screen, setScreen] = useState<Screen>(Screen.map);
  const { player, movePlayer, onEndTurn, increaseResource, buyArmy } = usePlayer();
  const { path, setPath, resetPath } = usePath();

  return (
    <>
      <Control player={player} screen={screen} setScreen={setScreen} onEndTurn={onEndTurn} resetPath={resetPath} />
      <Screens screen={screen} increaseResource={increaseResource} movePlayer={movePlayer} player={player} path={path} setPath={setPath} buyArmy={buyArmy} />
    </>
  );
};
