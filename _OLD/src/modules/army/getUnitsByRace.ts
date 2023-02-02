import { Race } from '../race/types';
import { IArmyUnit } from './interfaces';
import { peasant } from './peasant';
import { marksman } from './marksman';
import { imp } from './imp';
import { gargoyle } from './gargoyle';

export const getUnitsByRace = (race: Race): IArmyUnit[] => {
  switch (race) {
    case Race.knight:
      return [peasant, marksman];
    case Race.warlock:
      return [imp, gargoyle];
    default:
      return [];
  }
};
