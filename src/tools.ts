export const cutHead = <T>(array: T[]): T[] => {
  if (array.length <= 1) return array;
  const [, ...rest] = array;
  return rest;
};

export const tail = <T>(array: T[]): T => array[array.length - 1];
