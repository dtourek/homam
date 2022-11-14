import React from 'react';
import { IResources } from './interfaces';

interface IResourcesProps {
  resources: IResources;
}

export const Resources = ({ resources }: IResourcesProps) => {
  return (
    <div>
      Gold: {resources.gold} | Rock: {resources.rock} | Wood: {resources.wood}
    </div>
  );
};
