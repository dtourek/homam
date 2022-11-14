import { FieldType, IField } from './interfaces';

export const isObstacleField = (field: IField): boolean => field.type === FieldType.water || field.type === FieldType.forest || field.type === FieldType.mountain;
export const getField = (type: FieldType): IField => ({ type });
