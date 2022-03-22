import { useState } from 'react';

export interface IStore {
  day: number;
  increaseDay: () => void;
}

export const useStore = (): IStore => {
  const [day, setDay] = useState<number>(1);

  const increaseDay = (): void => setDay(day + 1);

  return { day, increaseDay };
};
