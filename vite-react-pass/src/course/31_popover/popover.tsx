import {
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  offset,
  arrow,
  FloatingArrow,
  useClick,
  flip,
} from "@floating-ui/react";
import {
  CSSProperties,
  memo,
  PropsWithChildren,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";
import "./index.css";
import { createPortal } from "react-dom";
type Alignment = "start" | "end";
type Side = "top" | "right" | "bottom" | "left";
type AlignedPlacement = `${Side}-${Alignment}`;
interface PoverOverProps extends PropsWithChildren {
  content: ReactNode;
  open?: boolean;
  openChange?: (open: boolean) => void;
  placement?: Side | AlignedPlacement;
  trigger?: "hover" | "click";
  className?: string;
  style?: CSSProperties;
}
export function PopOver(prop: PoverOverProps) {
  const el = useMemo(() => {
    const div = document.createElement("div");
    div.className = "wrapper";
    document.body.appendChild(div);
    return div;
  }, []);
  const {
    content,
    open,
    openChange,
    placement = "bottom",
    trigger = "hover",
    className,
    style,
  } = prop;
  const arrowRef = useRef(null);
  const [isOpen, setIsOpen] = useState(open);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      setIsOpen(open), openChange?.(open);
    },
    placement,
    middleware: [
      offset(10),
      arrow({
        element: arrowRef,
      }),
      flip(),
    ],
  });
  const interaction =
    trigger === "hover" ? useHover(context) : useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    interaction,
    dismiss,
  ]);
  const muC = (
    <div
      ref={refs.setFloating}
      className="popover-floating"
      style={{ ...floatingStyles }}
      {...getFloatingProps()}
    >
      {content}
      <FloatingArrow
        ref={arrowRef}
        context={context}
        fill="#fff"
        stroke="#000"
        strokeWidth={1}
      ></FloatingArrow>
    </div>
  );
  return (
    <>
      <span
        className={className}
        ref={refs.setReference}
        {...getReferenceProps()}
        style={style}
      >
        {prop.children}
      </span>
      {isOpen && createPortal(muC, el)}
    </>
  );
}
