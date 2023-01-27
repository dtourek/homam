import {FieldObjectType, FieldType, IDesertField, IGrassField, IHeroFieldObject, IMountainField, IResourceObject, Resource} from "homam/modules/field/interfaces";

export const desertField: IDesertField = { type: FieldType.desert, weight: 2, color: '#E7E4A5', isObstacle: false }
export const mountainField: IMountainField = { type: FieldType.mountain, color: '#1C1C1D', isObstacle: true }
export const grassField: IGrassField = { type: FieldType.grass,  weight: 1, color: '#C2F3D6', isObstacle: false }

export const goldResourceField: IResourceObject  = { type: FieldObjectType.Resource, object: { amount: 1000, type: Resource.Gold, color: '#FFD700' } }
export const woodResourceField: IResourceObject  = { type: FieldObjectType.Resource, object: { amount: 10, type: Resource.Wood, color: '#603C1A' } }
export const heroPlayer1Field: IHeroFieldObject = { type: FieldObjectType.Hero, object: { color: 'blue', name: 'Player 1' }}
