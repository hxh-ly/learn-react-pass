import { useState } from "react";
import { MessageProps, Position } from "./index";
type MessageList = {
  top: MessageProps[];
  bottom: MessageProps[];
};
let count = 0;
const default_top = "top";
export function getId(props: MessageProps) {
  if (props.id) {
    return props.id;
  }
  return ++count;
}
export function getMessagePosition(messageList: MessageList, id: number) {
  for (const [position, list] of Object.entries(messageList)) {
    if (list.findIndex((v) => v.id === id) > -1) {
      return position;
    }
  }
}
export function findMessage(messageList: MessageList, id: number) {
  const position = getMessagePosition(messageList, id);
  const idx = position
    ? messageList[position].findIndex((v) => v.id === id)
    : -1;
  return [position, idx];
}
const initMessageList: MessageList = { top: [], bottom: [] };
export function useStore(defaultPosition: Position) {
  const [messageList, setMessageList] = useState<MessageList>({
    ...initMessageList,
  });
  function add(props: MessageProps) {
    let id = getId(props);
    setMessageList((pre) => {
      if (props.id) {
        const po = getMessagePosition(messageList, props.id);
        if (po) {
          return pre;
        }
      }
      const position = props.position || defaultPosition;
      const isTop = position.includes("top");
      const newMessage = {
        ...props,
        id: id,
        position: isTop ? "top" : "bottom",
      };
      const messages = isTop
        ? [{ ...newMessage }, ...(pre[position] || [])]
        : [...(pre[position] || []), { ...newMessage }];
      return {
        ...pre,
        [position]: messages,
      };
    });
    return id;
    // 找不到创建return
  }
  function remove(id: number) {
    console.log('remove'+id);
    setMessageList((pre) => {
      const position = getMessagePosition(messageList, id);
      if (!position) return pre;
      return {
        ...pre,
        [position]: pre[position].filter((v) => v.id !== id),
      };
    });
  }
  function update(id: number, props: MessageProps) {
    setMessageList((pre) => {
      if (!id) {
        return;
      }
      const nextState = { ...pre };
      const [position, idx] = findMessage(nextState, id);
      return idx > -1
        ? (nextState[position][idx] = { ...nextState[position][idx], props })
        : nextState;
    });
  }
  function clearAll() {
    setMessageList({ ...initMessageList });
  }
  return {
    messageList,
    add,
    remove,
    update,
    clearAll,
  };
}
