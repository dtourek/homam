import React from 'react';
import { IConfig } from './interfaces';
import { initWorldMap } from './init';
import { MainScreen } from './modules/screen/MainScreen';

const config: IConfig = {
  unit: 20,
  mapMaxSize: 1000,
  playerMove: 5,
  map: initWorldMap,
};

const App = () => {
  return (
    <div>
      <h1>Heroes</h1>
      <MainScreen config={config} />
    </div>
  );
};

export default App;
