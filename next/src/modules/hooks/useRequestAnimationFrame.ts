import {useEffect, useRef} from "react";
import {UpdateStateFn} from "homam/pages/_app";

export const useRequestAnimationFrame = (updateFn: UpdateStateFn) => {
  const requestId = useRef<number>();

  useEffect(() => {
    const loop = () => {
      updateFn();
      requestId.current = requestAnimationFrame(loop);
    };
    requestId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestId.current as number);
  }, []);
}
