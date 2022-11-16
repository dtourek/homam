import React from 'react';
import { IConfig } from '../../interfaces';
import { usePath } from '../path/usePath';
import { Resources } from '../resources/Resources';
import { usePlayer } from '../player/usePlayer';
import { useTime } from '../time/useTime';
import { Map } from '../map/Map';

interface IMain {
  config: IConfig;
}

export const MainScreen = ({ config }: IMain) => {
  const { day, increaseDay } = useTime();
  const { player, movePlayer, onEndTurn, increaseResource } = usePlayer(config.playerMove);
  const { path, setPath, resetPath } = usePath();

  const endTurn = () => {
    increaseDay();
    resetPath(player, config.playerMove);
    onEndTurn({ gold: 1000, rock: 10, wood: 5 });
  };

  return (
    <>
      <Resources resources={player.resources} />
      <p>Remaining player move: {player.remainingMovement}</p>
      <p>Days: {day}</p>
      <button onClick={endTurn}>End turn</button>
      <br />
      <Map config={config} player={player} movePlayer={movePlayer} path={path} setPath={setPath} increaseResource={increaseResource} />
    </>
  );
};
