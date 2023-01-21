import type { AppProps } from 'next/app'
import {useRequestAnimationFrame} from "homam/modules/hooks/useRequestAnimationFrame";
import { ConfigProvider, defaultConfigValue } from "homam/modules/config/store";

const App = ({ Component, pageProps }: AppProps) => {
  useRequestAnimationFrame(() => console.log(':: RAF run and updateFn called'))

  return (
    <ConfigProvider value={defaultConfigValue}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

export default App
