import { useEffect, useRef } from "react";

export const useRequestAnimationFrame = (updateFn: () => void) => {
  const requestId = useRef<number>();

  useEffect(() => {
    const loop = () => {
      updateFn();
      requestId.current = requestAnimationFrame(loop);
    };
    requestId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestId.current as number);
  }, [updateFn]);
};
