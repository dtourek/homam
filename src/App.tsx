import React from 'react';
import {Main} from "./view/Main";

export interface IContext {
  unit: number;
  mapMaxSize: number;
}

const context: IContext  = {
  unit: 20,
  mapMaxSize: 1000,
};

const App = () => {
  return (
    <div>
      <h1>Heroes</h1>
      <Main context={context} />
    </div>
  );
}

export default App;
