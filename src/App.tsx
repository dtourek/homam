import React from 'react';
import { Main } from './view/Main';
import { IConfig } from './interfaces';

const config: IConfig = {
  unit: 20,
  mapMaxSize: 1000,
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
