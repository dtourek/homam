import type { AppProps } from 'next/app'
import {useRequestAnimationFrame} from "homam/modules/hooks/useRequestAnimationFrame";
import {useReducer} from "react";
import {IMapStore, MapContext, MapDispatch, mapReducer} from "homam/modules/map/store";
import {initMapFields} from "homam/seed/init";
import {HeroDispatch, heroReducer, HeroStore, IHero} from "homam/modules/hero/store";
import {heroCreg} from "homam/modules/hero/heroes";

export type UpdateStateFn = ReturnType<typeof updateState>

const updateState = (map: IMapStore, heroes: IHero[]) => {
  console.log(':: RAF run and updateFn called')
}

const App = ({ Component, pageProps }: AppProps) => {
  const [map, dispatchMap] = useReducer(mapReducer, {maxSize: 1000, fields: initMapFields, fieldSize: 20});
  const [heroes, dispatchHero] = useReducer(heroReducer,  [heroCreg])
  useRequestAnimationFrame()

  return (
    <MapDispatch.Provider value={dispatchMap}>
      <MapContext.Provider value={map}>
        <HeroStore.Provider value={heroes}>
        <HeroDispatch.Provider value={dispatchHero}>
          <Component {...pageProps} />
        </HeroDispatch.Provider>
        </HeroStore.Provider>
     </MapContext.Provider>
    </MapDispatch.Provider>
  )
}

export default App
