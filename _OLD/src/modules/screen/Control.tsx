import { useTime } from '../time/useTime';
import { Resources } from '../resources/Resources';
import { Screen } from './types';
import React from 'react';
import { IPlayer } from '../player/interfaces';
import { IUsePlayer } from '../player/usePlayer';

interface IControlProps {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  player: IPlayer;
  onEndTurn: IUsePlayer['onEndTurn'];
  defaultPlayerMove: number;
  resetPath: (player: IPlayer, defaultMovement: number) => void;
}

export const Control = ({ screen, setScreen, player, onEndTurn, defaultPlayerMove, resetPath }: IControlProps) => {
  const { day, increaseDay } = useTime();

  const endTurn = () => {
    increaseDay();
    resetPath(player, defaultPlayerMove);
    onEndTurn(player.id, { gold: 10, rock: 1, wood: 1 });
  };

  return (
    <>
      <p>Player: {player.id}</p>
      <Resources resources={player.resources} />
      <p>Remaining player move: {player.remainingMovement}</p>
      <p>Days: {day}</p>
      <button onClick={endTurn}>End turn</button>
      <button disabled={screen === Screen.barracks} onClick={() => setScreen(Screen.barracks)}>
        Barracks
      </button>
      <button disabled={screen === Screen.map} onClick={() => setScreen(Screen.map)}>
        Back to Map
      </button>
      <br />
    </>
  );
};
