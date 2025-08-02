import React, {
  createElement,
  CSSProperties,
  forwardRef,
  ReactNode,
  RefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import { useStore } from "./useStore";
import { useTimer } from "./useTimer";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./index.scss";
import { createPortal } from "react-dom";
export type Position = "top" | "bottom";
export interface MessageProps {
  id?: number;
  style?: CSSProperties;
  content: ReactNode;
  className?: string | string[];
  duration?: number;
  position?: Position;
  onClose?: (...args: any) => void;
}

function MessageItem(props: MessageProps) {
  const { onMouseEnter, onMouseLeave } = useTimer({
    id: props.id!,
    duration: props.duration,
    remove: props.onClose!,
  });
  return (
    <div
      className="message-item"
      style={{
        width: 100,
        lineHeight: "30px",
        border: "1px solid #000",
        margin: "20px",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.content}
    </div>
  );
}

export interface MessageRef {
  add: (prop: MessageProps) => number;
  remove: (id: number) => void;
  update: (id: number, prop: MessageProps) => void;
  clearAll: () => void;
}


export const MessageProvider = forwardRef<MessageRef>((props, ref) => {
  const { messageList, add, remove, update, clearAll } = useStore("top");
  useEffect(() => {
    /*  setInterval(() => {
      console.log("aa", messageList);
      add({
        content: Math.random().toString().slice(2, 8),
        duration:2000
      });
    }, 2000); */
  }, []);
  if('current' in ref!) {
    console.log('messageRef set')
    ref.current = {
        add,
        update,
        remove,
        clearAll
    }
}
/*   useImperativeHandle(
    ref,
    () => {
      return {
        add,
        remove,
        update,
        clearAll,
      };
    },
    []
  ); */
  const messageWrapper = (
    <div className="message-wrapper">
      {Object.keys(messageList).map((position) => {
        return (
          <TransitionGroup
            key={position}
            className={`message-wrapper-${position}`}
          >
            {messageList[position].map((v) => {
              return (
                <CSSTransition
                  timeout={1000}
                  key={v.content}
                  classNames="message"
                >
                  <MessageItem onClose={remove} {...v} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        );
      })}
    </div>
  );

  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = "wrapper";
    document.body.appendChild(el);
    return el;
  }, []);

  return createPortal(messageWrapper, el);
});
