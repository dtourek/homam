import {createContext} from "react";

export interface IHero {
  id: number;
  name: string;
  map: {
    maxSize: number;
    tileSize: number;
    tiles: string[][];
  }
  // skills: { attack: number, defence: number }
  // dailyMovement: number;
  location: [number, number]
  bird: {
    location: [number, number]
  }
}

enum Type {
  move = 'move',
  moveBird = 'move-bird',
}

type IAction = IMoveAction | IBirdMoveAction;


export const moveAction = ([x, y]: [number, number]) => ({ type: Type.move, location: [x, y] })
export const moveBirdAction = ([x, y]: [number, number]) => ({ type: Type.moveBird, location: [x, y] })


interface IMoveAction {
  type: Type.move;
  location: [number, number];
}

interface IBirdMoveAction {
  type: Type.moveBird;
  location: [number, number];
}

export const heroReducer = (state: IHero, action: IAction) => {
  switch (action.type) {
    case Type.move:
      return {...state, location: action.location}
    case Type.moveBird:
      return {...state, bird: { location: action.location }}
    default:
      return state
  }
}

export const initialHeroReducer: IHero = {
  location: [0,0],
  bird: {
    location: [0,0],
  },
  map: {
    maxSize: 1000,
    tileSize: 20,
    tiles: [[
      'D',
      'M',
      'M',
      'G',
      'G',
      'G',
      'G',
      'G',
      'G',
      'D',
      'D',
      'D',
    ],
      [
        'G',
        'G',
        'G',
        'M',
        'M',
        'G',
        'G',
        'G',
        'G',
        'D',
        'D',
        'D',
      ],
      [
        'M',
        'M',
        'G',
        'M',
        'G',
        'G',
        'G',
        'G',
        'G',
        'M',
        'M',
        'M',
      ],
      [
        'M',
        'G',
        'G',
        'M',
        'G',
        'M',
        'G',
        'G',
        'G',
        'M',
        'M',
        'M',
      ],
      [
        'G',
        'G',
        'G',
        'G',
        'G',
        'M',
        'G',
        'G',
        'G',
        'M',
        'M',
        'M',
      ],
      [
        'M',
        'M',
        'G',
        'G',
        'M',
        'M',
        'G',
        'G',
        'G',
        'M',
        'M',
        'M',
      ],
      [
        'M',
        'M',
        'G',
        'G',
        'M',
        'M',
        'G',
        'G',
        'G',
        'D',
        'D',
        'G',
      ],
      [
        'G',
        'G',
        'G',
        'G',
        'G',
        'G',
        'G',
        'G',
        'G',
        'D',
        'G',
        'G',
      ],
      [
        'M',
        'M',
        'G',
        'G',
        'G',
        'G',
        'D',
        'D',
        'G',
        'G',
        'G',
        'G',
      ],
      [
        'M',
        'M',
        'G',
        'G',
        'G',
        'G',
        'D',
        'D',
        'G',
        'G',
        'G',
        'G',
      ],
      [
        'M',
        'M',
        'G',
        'G',
        'G',
        'G',
        'G',
        'G',
        'G',
        'G',
        'G',
        'G',
      ],
      [
        'M',
        'M',
        'G',
        'G',
        'G',
        'G',
        'G',
        'G',
        'G',
        'G',
        'G',
        'G',
      ]]
  },
  name: 'Pepa',
  id: 15
}

export const HeroStore = createContext<IHero>(initialHeroReducer)
export const HeroDispatch = createContext((_value: IAction) => {})
