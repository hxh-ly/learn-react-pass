import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { useTodoListStore } from "./Store";
import {ListItem} from './Store';
interface GarbageBinProps {
  className: string | string[];
}
export function GarbageBin(props: GarbageBinProps) {
  const ref = useRef(null);
  const delItem = useTodoListStore((state)=>state.delItem)
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "list-item",
    drop(item:ListItem) {
      delItem(item.id)
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
  }));
  useEffect(() => {
    drop(ref);
  }, []);
  const cs = classNames(
    "h-[200px] border-2 border-black",
    "bg-orange-300",
    "leading-[200px] text-center text-2xl",
    "cursor-move select-none",
    isOver?'bg-yellow-400 border-dashed':'',
    props.className
  );
  return (
    <div ref={ref} className={cs}>
      垃圾箱
    </div>
  );
}
