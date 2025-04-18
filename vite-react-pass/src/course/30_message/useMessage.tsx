import { useContext, useRef } from "react";
import { MessageRef } from "./index";
import { MessageContextCtx } from "./ContextProvider";
export function useMessage() {
   const {ref} = useContext(MessageContextCtx);
   if(!ref) {
    throw new Error('请在最外层添加 ConfigProvider 组件');
   }

  return ref.current!;
}
