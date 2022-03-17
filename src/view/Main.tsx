import React from 'react';
import { Map } from './Map';
import { IConfig } from '../interfaces';
import { useStore } from '../store/useStore';

interface IMain {
  config: IConfig;
}

export const Main = ({ config }: IMain) => {
  const store = useStore();
  return (
    <>
      <p>Path weight: {store.pathWeight}</p>
      <svg xmlns="http://www.w3.org/2000/svg" height={config.mapMaxSize} width={config.mapMaxSize}>
        <Map config={config} store={store} />
      </svg>
    </>
  );
};
