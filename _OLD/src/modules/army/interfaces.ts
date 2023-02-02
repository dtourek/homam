import { ResourceType } from '../resources/interfaces';
import { Race } from '../race/types';

export enum UnitName {
  peasant = 'peasant',
  marksman = 'marksman',
  imp = 'imp',
  gargoyle = 'gargoyle',
}

export enum UnitMovementType {
  foot = 'foot',
  flying = 'flying',
}

export enum UnitAttackType {
  distance = 'distance',
  close = 'close',
}

interface ICost {
  amount: number;
  type: ResourceType;
}

export interface IUnitMovement {
  type: UnitMovementType;
  speed: number;
}

export interface IUnitAttack {
  type: UnitAttackType;
  damage: [number, number];
}

export interface IArmyUnit {
  id: number;
  name: UnitName;
  race: Race;
  movement: IUnitMovement;
  attack: IUnitAttack;
  hp: number;
  cost: ICost[];
  owned?: number;
}
