import { useEffect, useRef, useState } from "react";
import { TransformOffset } from "./Transform";
import { Color } from "./Color";

interface useColorDragProps {
  offset?: TransformOffset;
  containerRef: React.RefObject<HTMLDivElement>;
  targetRef: React.RefObject<HTMLDivElement>;
  direction?: "x" | "y";
  onDragChange: (offset: TransformOffset) => void;
  color: Color;
  calculate: () => TransformOffset;
}
type EventType = MouseEvent | React.MouseEvent<Element, MouseEvent>;
type EventHandle = (e: EventType) => void;
export function useColorDrag(
  props: useColorDragProps
): [TransformOffset, EventHandle] {
  const {
    offset,
    containerRef,
    targetRef,
    direction,
    onDragChange,
    color,
    calculate,
  } = props;
  const [offsetValue, setOffsetValue] = useState(offset || { x: 0, y: 0 });
  const dragRef = useRef({
    flag: false,
  });
  useEffect(() => {
    if (!dragRef.current.flag) {
      if (calculate) {
        setOffsetValue(calculate());
      }
    }
  }, [color]);
  useEffect(() => {
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragStop);
  }, []);

  const updateOffset = (e: EventType) => {
    const scrollOffsetX = document.documentElement.scrollLeft;
    const scrollOffsetY = document.documentElement.scrollTop;
    // 更新offset
    const pageX = e.pageX - scrollOffsetX;
    const pageY = e.pageY - scrollOffsetY;
    // - 减去滚动的
    const { x, y, width, height } =
      containerRef.current.getBoundingClientRect();
    const { width: targetWidth, height: targetHeight } =
      targetRef.current.getBoundingClientRect();
    const centerWidth = targetWidth / 2;
    const centerHeight = targetHeight / 2;
    const offsetX = Math.max(Math.min(pageX - x, width), 0) - centerWidth;
    const offsetY = Math.max(Math.min(pageY - y, height), 0) - centerHeight;
    const calOffset = {
      x: offsetX,
      y: direction === "x" ? offsetValue.y : offsetY,
    };
    setOffsetValue(calOffset);
    onDragChange?.(calOffset);
  };
  const onDragMove: EventHandle = (e) => {
    e.preventDefault();
    updateOffset(e);
  };
  const onDragStop: EventHandle = (e) => {
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragStop);

    dragRef.current.flag = false;
  };
  const onDragStart: EventHandle = (e) => {
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragStop);

    dragRef.current.flag = true;
  };

  return [offsetValue, onDragStart];
}
