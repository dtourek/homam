import React from 'react';
import { Map } from './map/Map';
import { IConfig } from '../interfaces';
import { useStore } from '../store/useStore';
import { usePath } from '../store/usePath';
import { Resources } from './resources/Resources';
import { usePlayer } from '../store/player/usePlayer';

interface IMain {
  config: IConfig;
}

export const Main = ({ config }: IMain) => {
  const { day, increaseDay } = useStore();
  const { resetMovement, player, movePlayer, increaseResources } = usePlayer(config.playerMove);
  const { path, setPath, resetPath } = usePath();

  const endTurn = () => {
    increaseDay();
    resetMovement();
    resetPath(player, config.playerMove);
    increaseResources({ gold: 1000, rock: 10, wood: 5 });
  };

  return (
    <>
      <Resources resources={player.resources} />
      <p>Remaining player move: {player.remainingMovement}</p>
      <p>Days: {day}</p>
      <button onClick={endTurn}>End turn</button>
      <br />
      <Map config={config} player={player} movePlayer={movePlayer} path={path} setPath={setPath} />
    </>
  );
};
