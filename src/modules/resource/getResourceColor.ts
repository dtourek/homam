import { ResourceType } from 'homam/modules/store/interfaces';

export const getResourceColor = (type: ResourceType) => {
  switch (type) {
    case ResourceType.gold:
      return '#FFD700';
    case ResourceType.rock:
      return '#C3C4C4';
    case ResourceType.wood:
    default:
      return '#D6CEB8';
  }
};
