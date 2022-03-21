import React, { useState } from 'react';
import { Map } from './map/Map';
import { IConfig, ILocation } from '../interfaces';
import { useStore } from '../store/useStore';
import { usePlayer } from '../store/usePlayer';

interface IMain {
  config: IConfig;
}

export const Main = ({ config }: IMain) => {
  const { day, increaseDay } = useStore();
  const { resetMovement, player, updatePlayer } = usePlayer(config.playerMove);
  const [path, setPath] = useState<ILocation[]>([]);

  const endTurn = () => {
    increaseDay();
    resetMovement();
    setPath([]);
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
