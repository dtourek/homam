import React from 'react';
import { Map } from './map/Map';
import { IConfig } from '../interfaces';
import { useStore } from '../store/useStore';
import { usePlayer } from '../store/usePlayer';
import { usePath } from '../store/usePath';

interface IMain {
  config: IConfig;
}

export const Main = ({ config }: IMain) => {
  const { day, increaseDay } = useStore();
  const { resetMovement, player, updatePlayer } = usePlayer(config.playerMove);
  const { path, setPath, resetPath } = usePath();

  const endTurn = () => {
    increaseDay();
    resetMovement();
    resetPath(player, config.playerMove);
  };

  return (
    <>
      <p>Remaining player move: {player.remainingMovement}</p>
      <p>Days: {day}</p>
      <button onClick={endTurn}>End turn</button>
      <br />

      <Map config={config} player={player} updatePlayer={updatePlayer} path={path} setPath={setPath} />
    </>
  );
};
