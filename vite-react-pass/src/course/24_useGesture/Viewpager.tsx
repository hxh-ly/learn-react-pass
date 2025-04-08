import { animated, useSprings } from "@react-spring/web";
import "./index.css";
import { useRef } from "react";
import { useDrag } from "@use-gesture/react";
const pages = [
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];
function Viewpager() {
  const index = useRef(0);
  const width = window.innerWidth;
  const [props, api] = useSprings(pages.length, (i) => {
    return {
      x: width * i,
      scale: 1,
    };
  });

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], velocity,cancel }) => {
      // 激活过一半的时候，改变idx
      if (active && Math.abs(mx) > width / 2) {
        let newIdx = index.current + (xDir > 0 ? -1 : 1);
        console.log(mx,xDir,newIdx);
        if (newIdx < 0) {
          newIdx = 0;
        }
        if (newIdx > pages.length - 1) {
          newIdx = pages.length - 1;
        }
        index.current = newIdx;
        // 生效
        cancel();
      }
      // 启动动画 x的 translate3d的x scale的拖拽就变小的
      api.start((i) => ({
        scale: active ? 1 - Math.abs(mx) / width : 1,
        x: (i - index.current) * width + (active ? mx : 0),
      }));
    }
  );

  return (
    <div className="wrapper">
      {props.map(({ x, scale }, i) => {
        return (
            <animated.div key={i} style={{ x }} {...bind()}className="page">
              <animated.div
                style={{ scale, backgroundImage: `url(${pages[i]})` }}
              />
            </animated.div>
        );
      })}
    </div>
  );
}

export default Viewpager;
