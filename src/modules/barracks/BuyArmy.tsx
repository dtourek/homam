import React, { FormEvent, useState } from 'react';
import { IArmyUnit } from '../army/interfaces';
import { IPlayerResources } from '../resources/interfaces';
import { IUsePlayer } from '../player/usePlayer';
import { maxUnits } from './maxUnits';

interface IProps {
  army: IArmyUnit[];
  unit: IArmyUnit;
  buyArmy: IUsePlayer['buyArmy'];
  resources: IPlayerResources;
}

export const BuyArmy = ({ buyArmy, unit, resources }: IProps) => {
  const [buyCount, setBuyCount] = useState<number>(0);

  const buyUnit = (event: FormEvent, unit: IArmyUnit) => {
    event.preventDefault();
    if (buyCount > 0) {
      buyArmy(unit, buyCount);
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
            if (value <= maxUnits(unit, resources)) {
              setBuyCount(value);
            }
          }}
        />
        <button type="button" onClick={() => setBuyCount(maxUnits(unit, resources))}>
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
