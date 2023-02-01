import type { AppProps } from 'next/app'
import {useRequestAnimationFrame} from "homam/modules/hooks/useRequestAnimationFrame";
import {useReducer, useState} from "react";
import {GameDispatch, GameStore, gameStoreReducer} from "homam/modules/store/store";
import {initialGameStore} from "homam/init";

const App = ({ Component, pageProps }: AppProps) => {
  const [heroes, dispatchHero] = useReducer(gameStoreReducer, initialGameStore)
  const [count, setCount] = useState(0)

  useRequestAnimationFrame(() => {
    setCount((i) => i + 1)
  })

  return (
      <GameStore.Provider value={heroes}>
        <GameDispatch.Provider value={dispatchHero}>
          <Component {...pageProps} />
        </GameDispatch.Provider>
      </GameStore.Provider>
  )
}

export default App
