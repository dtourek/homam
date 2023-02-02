import React, { FormEvent, useState } from 'react';
import { IArmyUnit } from '../army/interfaces';
import { IUsePlayer } from '../player/usePlayer';
import { maxUnits } from './maxUnits';
import { IPlayer } from '../player/interfaces';

interface IProps {
  unit: IArmyUnit;
  buyArmy: IUsePlayer['buyArmy'];
  player: IPlayer;
}

export const BuyArmy = ({ buyArmy, unit, player }: IProps) => {
  const [buyCount, setBuyCount] = useState<number>(0);

  const buyUnit = (event: FormEvent, unit: IArmyUnit) => {
    event.preventDefault();
    if (buyCount > 0) {
      buyArmy(player.id, unit, buyCount);
      setBuyCount(0);
    }
  };

  return (
    <div>
      <form onSubmit={(event) => buyUnit(event, unit)}>
        <input
          type="number"
          value={buyCount}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value <= maxUnits(unit, player.resources)) {
              setBuyCount(value);
            }
          }}
        />
        <button type="button" onClick={() => setBuyCount(maxUnits(unit, player.resources))}>
          Max
        </button>
        <button type="submit" disabled={buyCount === 0}>
          Buy
        </button>
      </form>
      {buyCount > 0 && (
        <p>
          Cost:
          {unit.cost.map((cost) => (
            <span key={cost.type}>
              {cost.type}: {cost.amount * buyCount}
            </span>
          ))}
        </p>
      )}
    </div>
  );
};
