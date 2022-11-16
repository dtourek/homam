import { FieldType, IField } from '../map/interfaces';
import { IMapResource, ResourceType } from './interfaces';

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
