import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useTodoListStore } from "./Store";
interface GapProps {
  id:string
}
export function Gap({id}:GapProps) {
  const addItem = useTodoListStore((state) => state.addItem);
  const ref = useRef(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "new-item",
    drop(item) {
      addItem({
        id: Math.random().toString().slice(2,8),
        status: "todo",
        content: "待办事项",
      },id);
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
  const cs = classNames("h-[10px]", isOver ? "bg-red-300" : "");
  return <div ref={ref} className={cs}></div>;
}
