import React from 'react';
import { Map } from './Map';
import { IContext } from '../App';

interface IMain {
  context: IContext;
}

export const Main = ({ context }: IMain) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={context.mapMaxSize} width={context.mapMaxSize}>
      <Map context={context} />
    </svg>
  );
};
