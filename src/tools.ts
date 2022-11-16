import { Nullable } from 'tabor';

export const cutHead = <T>(array: T[]): T[] => {
  if (array.length <= 1) return array;
  const [, ...rest] = array;
  return rest;
};

export const tail = <T>(array: T[]): T => array[array.length - 1];
export const is = <T>(value?: Nullable<T>): value is T => !!value;
