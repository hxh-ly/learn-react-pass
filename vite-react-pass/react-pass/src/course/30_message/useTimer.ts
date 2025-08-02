import { useEffect, useRef } from "react";

export interface UseTimerProps {
  id: number;
  duration?: number;
  remove: (id: number) => void;
}
export function useTimer(props: UseTimerProps) {
  const { duration, remove, id } = props;
  let timer = useRef(null)

  let startTimer = ()=>{
    timer.current = window.setTimeout(() => {
        remove?.(id);
        removeTimer();
      }, duration||3000);
  }
  let removeTimer = ()=>{
    if(timer.current) {
        clearTimeout(timer.current)
        timer.current = null;
    }
    
  }
/*   useEffect(() => {
    startTimer();
    return () => removeTimer();
  }, []); */
  function onMouseLeave() {
    console.log('onMouseLeave')
    startTimer();
  }

  function onMouseEnter() {
    console.log('onMouseEnter')
    removeTimer();
  }
  return {
    onMouseLeave,
    onMouseEnter,
  };
}
