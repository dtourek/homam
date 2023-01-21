import React, { useReducer } from 'react';
import { IConfig } from './interfaces';
import { initPlayerOne, initPlayerTwo, initWorldMap } from './init';
import { MainScreen } from './modules/screen/MainScreen';
import { ConfigDispatchContext, configReducer, ConfigStateContext } from './modules/store/config';
import { PlayerDispatchContext, playerReducer, PlayerStateContext } from './modules/player/playerStore';

const config: IConfig = {
  unit: 20,
  mapMaxSize: 1000,
  playerMove: 5,
  map: initWorldMap,
  players: [initPlayerOne, initPlayerTwo],
};

const App = () => {
  const [configState, dispatchConfig] = useReducer(configReducer, config);
  const [player, dispatchPlayer] = useReducer(playerReducer, config.players);

  return (
    <PlayerDispatchContext.Provider value={dispatchPlayer}>
      <PlayerStateContext.Provider value={player}>
        <ConfigDispatchContext.Provider value={dispatchConfig}>
          <ConfigStateContext.Provider value={configState}>
            <div>
              <h1>Heroes</h1>
              <MainScreen />
            </div>
          </ConfigStateContext.Provider>
        </ConfigDispatchContext.Provider>
      </PlayerStateContext.Provider>
    </PlayerDispatchContext.Provider>
  );
};

export default App;
