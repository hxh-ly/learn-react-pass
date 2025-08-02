import classNames from "classnames";
import { FC, Fragment, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Item } from "./Item";
import { Gap } from "./Gap";
import { useTodoListStore } from "./Store";
import { useTransition,animated } from "@react-spring/web";
interface ListProps {
  className?: string | string[];
}

export const List: FC<ListProps> = (props) => {
  const list = useTodoListStore((state) => state.list);
  const cs = classNames("h-full ", props.className);
  const transitions = useTransition(list, {
    from: { transform: "translate3d(-100%,0,0)", opacity: 0 },
    enter: { transform: "translate3d(0%,0,0)", opacity: 1 },
    leave: { transform: "translate3d(100%,0,0)", opacity: 0 },
    keys: list.map((v) => v.id),
  });
  return (
    <div className={cs}>
      {list.length ? (
        transitions((style,v)=>(
       <animated.div style={style}>
          <Gap id={v.id}></Gap>
          <Item data={v}></Item>
        </animated.div>
        ))
      ) : (
        "暂无待办事项"
      )}
      <Gap id={""}></Gap>
    </div>
  );
};
