import React from 'react';
import { IPlayerResources } from './interfaces';

interface IResourcesProps {
  resources: IPlayerResources;
}

export const Resources = ({ resources }: IResourcesProps) => {
  return (
    <div>
      Gold: {resources.gold} | Rock: {resources.rock} | Wood: {resources.wood}
    </div>
  );
};
