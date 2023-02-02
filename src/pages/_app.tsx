import type { AppProps } from 'next/app';
import { useRequestAnimationFrame } from 'homam/modules/hooks/useRequestAnimationFrame';
import { useState } from 'react';
import { GameDispatch, GameStore, useReducerWithMiddleware } from 'homam/modules/store/store';
import { heroMoveMiddleware } from 'homam/modules/store/middleware';

const App = ({ Component, pageProps }: AppProps) => {
  const [heroes, dispatchHero] = useReducerWithMiddleware(async (action) => {
    if (action.type === 'hero-move-start') {
      await heroMoveMiddleware(dispatchHero, heroes.player.hero.location, action.location);
    }
  });
  const [count, setCount] = useState(0);

  useRequestAnimationFrame(() => {
    setCount((i) => i + 1);
  });

  return (
    <GameStore.Provider value={heroes}>
      <GameDispatch.Provider value={dispatchHero}>
        <Component {...pageProps} />
      </GameDispatch.Provider>
    </GameStore.Provider>
  );
};

export default App;
