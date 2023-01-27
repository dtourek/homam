export enum FieldType {
  mountain = 'mountain',
  grass = 'grass',
  desert = 'desert',
}


export interface IGrassField {
  type: FieldType.grass;
  isObstacle: false
  weight: 1;
  color: '#C2F3D6'
}

export interface IMountainField {
  type: FieldType.mountain;
  isObstacle: true
  color: '#1C1C1D'
}

export interface IDesertField {
  type: FieldType.desert;
  isObstacle: false;
  weight: 2;
  color: '#E7E4A5'
}

type IFieldType = IGrassField | IMountainField | IDesertField


export enum Resource {
  Gold = 'Gold',
  Wood = 'Wood'
}

export enum FieldObjectType {
  Resource = 'Resource',
  Hero = 'Hero'
}

export interface IGoldResource {
  type: Resource.Gold;
  amount: number;
  color: '#FFD700'
}

export interface IWoodResource {
  type: Resource.Wood;
  amount: number;
  color: '#603C1A'
}

interface IHero {
  color: string;
  name: string;
}

export interface IResourceObject {
  type: FieldObjectType.Resource;
  object: IGoldResource | IWoodResource
}

export interface IHeroFieldObject {
  type: FieldObjectType.Hero;
  object: IHero
}

type IFieldObject = IResourceObject | IHeroFieldObject  // TODO - Hero, Army, mine, building,..

export interface IMapField {
  type: IFieldType;
  onField?: IFieldObject;
}
