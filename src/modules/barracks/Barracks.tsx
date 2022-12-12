import React from 'react';
import { getUnitsByRace } from '../army/getUnitsByRace';
import { IPlayer } from '../player/interfaces';
import { BuyArmy } from './BuyArmy';
import { IUsePlayer } from '../player/usePlayer';

interface IProps {
  player: IPlayer;
  buyArmy: IUsePlayer['buyArmy'];
}

export const Barracks = ({ player, buyArmy }: IProps) => {
  const units = getUnitsByRace(player.race);

  return (
    <div style={{ border: '1px solid #cccc' }}>
      <h1>Barracks</h1>
      {units.map((unit) => (
        <div style={{ border: '1px solid #ccc' }} key={unit.id}>
          <ul>
            <li>Name: {unit.name}</li>
            <li>Race: {unit.race}</li>
            <li>
              Damage: {unit.attack.damage[0]} - {unit.attack.damage[1]}
            </li>
            <li>Health: {unit.hp}</li>
            <li>
              Movement: speed: {unit.movement.speed}, type: {unit.movement.speed}
            </li>
            <li>
              Cost:
              {unit.cost.map((cost) => (
                <span key={`${cost.type}-${cost.amount}`}>
                  {cost.type}: {cost.amount}
                </span>
              ))}
            </li>
            <li>Owned: {player.army.find((u) => unit.id === u.id)?.owned ?? 0}</li>
            <BuyArmy army={player.army} buyArmy={buyArmy} unit={unit} resources={player.resources} />
          </ul>
        </div>
      ))}
    </div>
  );
};
