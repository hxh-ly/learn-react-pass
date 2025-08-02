import { createContext, PropsWithChildren, RefObject, useRef } from "react";
import { MessageProps, MessageProvider, MessageRef } from ".";

export interface MessageContext {
  ref?: RefObject<MessageRef>;
}
export const MessageContextCtx = createContext<MessageContext>({});
export function ContextProvider(props: PropsWithChildren) {
    const ref = useRef<MessageRef>(null);
  return (
    <>
      <MessageContextCtx.Provider value={{ ref }}>
        <MessageProvider ref={ref}></MessageProvider>
        {props.children}
      </MessageContextCtx.Provider>
    </>
  );
}
