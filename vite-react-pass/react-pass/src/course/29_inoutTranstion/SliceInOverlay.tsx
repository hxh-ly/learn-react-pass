import { PropsWithChildren } from "react";
import Overlay from "./Overlay";
import React from "react";
import { config, useTransition, animated } from "@react-spring/web";
const D = 2000;
interface SliceInOverlayProps extends PropsWithChildren {
  isVisible: boolean;
  from: "right" | "bottom";
}

export default function SliceOverlay(props: SliceInOverlayProps) {
  const { isVisible, from, children } = props;
  const x = React.useMemo(
    () => (from === "right" ? window.screen.width : window.screen.height),
    [from]
  );

  const transitons = useTransition(isVisible, {
    x,
    opacity: 1,
    from: {
      x,
      opacity: 1,
    },
    enter: {
      x: 0,
      opacity: 1,
    },
    leave: {
      x,
      opacity: 0,
    },
    config: { duration: D },
  });

  const tanslate = React.useCallback(
    (x: number) => {
      return from === "bottom" ? `translateY(${x}px)` : `translateX(${x}px)`;
    },
    [from]
  );

  return (
    <>
      {transitons((props, isVisible) => {
        return (
          isVisible && (
            <Overlay
              as={animated.div}
              style={{
                transform: props.x.to((x) => (x === 0 ? "none" : tanslate(x))),
                opacity: props.opacity,
              }}
            >
              {children}
            </Overlay>
          )
        );
      })}
    </>
  );
}

export { SliceOverlay, D };
