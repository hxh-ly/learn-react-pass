import {
  useSpringValue,
  animated,
  useSpring,
  useSprings,
  useSpringRef,
  useChain,
  useTrail,
} from "@react-spring/web";
import "./index.css";
import { useEffect } from "react";
const MAX_WIDTH = 150;
const MAX_HEIGHT = 100;
const STROKE_WIDTH = 0.5;
const COORDS = [
  [50, 30],
  [90, 30],
  [50, 50],
  [60, 60],
  [70, 60],
  [80, 60],
  [90, 50],
];
export function TestReactSpring() {
  const spring = useSpringValue(0, {
    config: {
      duration: 2000,
    },
  });
  useEffect(() => {
    spring.start(300);
  }, []);
  // useSpringValue
  // useSpring
  // useSprings
  // useSpringRef
  // useTrail
  // useChain

  return (
    <>
      <animated.div className="box" style={{ width: spring }}>
        {" "}
        useSpringValue{" "}
      </animated.div>
    </>
  );
}
export function TestReactSpring1() {
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 2000,
    },
  });
  // useSpring
  // useSprings
  // useSpringRef
  // useTrail
  // useChain

  return (
    <>
      <animated.div className="box" style={{ ...spring }}>
        {" "}
        useSpringValue{" "}
      </animated.div>
    </>
  );
}
export function TestReactSpring2() {
  const [spring, api] = useTrail(3, () => ({
    from: { width: 0, opacity: 0 },
    config: {
      duration: 2000,
    },
  }));
  useEffect(() => {
    setTimeout(() => {
      api.start({ width: 200, opacity: 1 });
    }, 2000);
  }, []);
  // useSpring
  // useSprings
  // useSpringRef
  // useTrail
  // useChain

  return (
    <>
      {spring.map((style, i) => {
        return (
          <animated.div className="box" style={style}>
            {i}
          </animated.div>
        );
      })}
    </>
  );
}
export function TestReactSpring3() {
  const w1 = useSpringRef();
  const width = useSpring({
    ref: w1,
    from: {
      width: 0,
    },
    to: {
      width: 200,
    },
  });
  const o1 = useSpringRef();
  const spring2 = useSpring({
    ref: o1,
    from: { height: 100 },
    to: { height: 50 },
  });
  useChain([w1, o1], [0, 1], 4000);
  // useTrail

  return (
    <>
      <animated.div className="box" style={{ ...width, ...spring2 }}>
        {" "}
        useChain
      </animated.div>
    </>
  );
}

export function TestSmile() {
  const gridRef = useSpringRef();
  const gridSprings = useTrail(16, {
    ref: gridRef,
    from: { x2: 0, y2: 0 },
    to: { x2: MAX_WIDTH, y2: MAX_HEIGHT },
  });
  const boxApi = useSpringRef();
  const [boxSprings] = useSprings(7, (i) => {
    return {
      ref: boxApi,
      from: { scale: 0 },
      to: { scale: 1 },
      delay: i * 200,
      config: {
        mass: 2,
        tension: 220,
        friction:10
      },
    };
  });
  useChain([gridRef, boxApi], [0, 1], 4500);
  return (
    <>
      <div className="container">
        <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
          <g>
            {gridSprings.map(({ x2 }, index) => {
              return (
                <animated.line
                  x1={0}
                  y1={index * 10}
                  x2={x2}
                  y2={index * 10}
                  key={index}
                  strokeWidth={STROKE_WIDTH}
                  stroke="currentColor"
                />
              );
            })}

            {gridSprings.map(({ y2 }, index) => {
              return (
                <animated.line
                  x1={index * 10}
                  y1={0}
                  x2={index * 10}
                  y2={y2}
                  key={index}
                  strokeWidth={STROKE_WIDTH}
                  stroke="currentColor"
                />
              );
            })}
            {boxSprings.map(({ scale }, i) => {
              return (
                <animated.rect
                  key={i}
                  width={10}
                  height={10}
                  fill="currentColor"
                  style={{
                    transform: `translate(${COORDS[i][0]}px, ${COORDS[i][1]}px)`,
                    transformOrigin: `5px 5px`,
                    scale,
                  }}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </>
  );
}
