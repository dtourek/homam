import { FieldType, IField } from './interfaces';
import { IMapResource } from '../../resources/interfaces';

export const isObstacleField = (field: IField): boolean => field.type === FieldType.water || field.type === FieldType.forest || field.type === FieldType.mountain;
export const getField = (type: FieldType, resource?: IMapResource): IField => ({ type, resource });
