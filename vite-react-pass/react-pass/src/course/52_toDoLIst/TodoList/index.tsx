import { FC } from "react";
import { NewItem } from "./NewItem";
import { GarbageBin } from "./GarbageBin";
import { List } from "./List";
import classNames from "classnames";
interface TodoListProps {}

export const TodoList: FC<TodoListProps> = (props) => {
  return (
    <div
      className={classNames(
        "w-[1000px] h-[600px] m-auto mt-10 p-[10px]",
        "border-2 border-black",
        "flex justify-between items-start"
      )}
    >
      <div className="flex-2 h-full mr-[10px] overflow-auto">
        <List></List>
      </div>
      <div className={classNames("flex-1 h-full", "flex flex-col justify-start")}>
        <NewItem></NewItem>
        <GarbageBin className="mt-[10px]"></GarbageBin>
      </div>
    </div>
  );
};
