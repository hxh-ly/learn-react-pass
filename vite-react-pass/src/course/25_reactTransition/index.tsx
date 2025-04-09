import { useTransition, AnimatedProps, animated } from "@react-spring/web";
import React, { CSSProperties, useState } from "react";
type PropType = (
  props: AnimatedProps<{ style: CSSProperties }>
) => React.ReactElement;

const list: PropType[] = [
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightpink" }}>A</animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightblue" }}>B</animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightgreen" }}>
      C
    </animated.div>
  ),
];

export function TestTransition() {
  const [idx, setIdx] = useState(0);
  const t = useTransition(idx, {
    from: { transform: "translate3d(100%,0,0)" },
    enter: { transform: "translate3d(0%,0,0)" },
    to: { transform: "translate3d(-100%,0,0)" },
  });
  const onClickf = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIdx((state) => (state + 1) % 3);
  };
  return (
    <div className="container" onClick={(e) => onClickf(e)}>
      {t((v, i) => {
        const Page = list[i];
        return <Page style={v} />;
      })}
    </div>
  );
}
export function TestTransition2() {
  const [item, setItem] = useState([
    { id: 0, name: "1" },
    { id: 1, name: "2" },
  ]);
  const t = useTransition(item, {
    initial:{ transform: "translate3d(0%,0,0)" },
    from: { transform: "translate3d(100%,0,0)" },
    enter: { transform: "translate3d(0%,0,0)" },
    to: { transform: "translate3d(-100%,0,0)" },
  });
  return (
    <div className="">
      <div className="item-box">
        {t((v, i) => {
          return <animated.div  className='item' style={v}>
            {i.name}
            <span className="del-btn" onClick={() => setItem(item.filter(sitem=>sitem.id!==i.id))}>del</span>
          </animated.div>;
        })}
      </div>
      <div
          className="btn"
          onClick={() => setItem([...item, { id: Date.now(), name: "ff" }])}
        >
          {" "}
          add
        </div>
    </div>
  );
  /* useTransition(list,(v,i)=>{
      const Page = list[i];
      return <Page style={v}/>
    }); */
}
