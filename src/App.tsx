import React from 'react';
import { Main } from './view/Main';
import { IConfig } from './interfaces';
import { initWorldMap } from './init';

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
      <Main config={config} />
    </div>
  );
};

export default App;
