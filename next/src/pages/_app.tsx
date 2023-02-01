import type { AppProps } from 'next/app'
import {useRequestAnimationFrame} from "homam/modules/hooks/useRequestAnimationFrame";
import {useReducer, useState} from "react";
import {HeroDispatch, heroReducer, HeroStore, IHero, initialHeroReducer} from "homam/modules/hero/store";

const App = ({ Component, pageProps }: AppProps) => {
  const [heroes, dispatchHero] = useReducer(heroReducer, initialHeroReducer)

  const [count, setCount] = useState(0)
  useRequestAnimationFrame(() => {
    setCount((i) => i + 1)
  })

  return (
      <HeroStore.Provider value={heroes}>
        <HeroDispatch.Provider value={dispatchHero}>
          <Component {...pageProps} />
        </HeroDispatch.Provider>
      </HeroStore.Provider>
  )
}

export default App
