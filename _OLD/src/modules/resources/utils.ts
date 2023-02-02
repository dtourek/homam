import { IMapResource, IResourceField, ResourceType } from './interfaces';
import { ILocation } from '../player/interfaces';
import { FieldType, IField } from '../map/field/interfaces';

export const isResourceField = (field: IField): field is { type: FieldType; resource: IMapResource } => !!field.resource;
export const getResourceFieldColor = (resource: IMapResource) => {
  switch (resource.type) {
    case ResourceType.gold:
      return '#FFD700';
    case ResourceType.rock:
      return '#C3C4C4';
    default:
      return '#D6CEB8'; // wood
  }
};

export const getResourceField = (resources: IResourceField[], currentLocation: ILocation) =>
  resources.find((resource) => resource.location.x === currentLocation.x && resource.location.y === currentLocation.y);
