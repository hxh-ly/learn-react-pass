import { useRef } from "react";
import { MessageProvider, MessageRef } from "../course/30_message";
import { useMessage } from "../course/30_message/useMessage";
import { ContextProvider } from "../course/30_message/ContextProvider";
function Aaa() {
  const message = useMessage();
  return (
    <button
      onClick={() => {
        message.add({
          content: Math.random()*1000,
        });
      }}
    >
      成功
    </button>
  );
}
export function Home30() {
  return (
    <>
      <ContextProvider>
        <Aaa></Aaa>
      </ContextProvider>
    </>
  );
}
