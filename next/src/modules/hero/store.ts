import {createContext} from "react";

export interface IHero {
  id: number;
  name: string;
  skills: { attack: number, defence: number }
  dailyMovement: number;
  location: [number, number]
}

enum Type {
  move = 'move',
}

type IAction = IMoveAction


interface IMoveAction {
  type: Type.move;
  location: [number, number];
}

export const heroReducer = (state: IHero[], action: IAction) => {
  switch (action.type) {
    case Type.move:
      return {...state, location: action.location}
    default:
      return state
  }
}

export const HeroStore = createContext<IHero[]>([])
export const HeroDispatch = createContext((_value: IAction) => {})
