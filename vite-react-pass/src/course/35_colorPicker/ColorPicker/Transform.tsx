import { forwardRef, ReactNode } from "react";

export interface TransformOffset {
  x: number;
  y: number;
}
interface TransProps {
  offset?: TransformOffset;
  children?: ReactNode;
}
export const TransForm = forwardRef<HTMLDivElement, TransProps>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: props.offset.x ?? 0,
        top: props.offset.y ?? 0,
        zIndex: 1,
      }}
    >
      {props.children}
    </div>
  );
});
