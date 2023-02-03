import type { AppProps } from "next/app";
import { useRequestAnimationFrame } from "homam/modules/hooks/useRequestAnimationFrame";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "homam/store";

const App = ({ Component, pageProps }: AppProps) => {
  const [count, setCount] = useState(0);

  useRequestAnimationFrame(() => {
    setCount((i) => i + 1);
  });

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
