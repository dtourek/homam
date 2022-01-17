
export interface IField {
 type: FieldType
}

export enum FieldType {
  water = 'water',
  mountain = 'mountain',
  forest = 'forest',
  grass = 'grass',
  mud = 'mud'
}

export const isObstacleField = (field: IField): boolean => field.type === FieldType.water || field.type === FieldType.forest || field.type === FieldType.mountain

export const getField = (type: FieldType): IField => ({
  type,
})

