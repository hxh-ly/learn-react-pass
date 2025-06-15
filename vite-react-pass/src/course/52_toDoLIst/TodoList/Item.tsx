import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { ListItem, useTodoListStore } from "./Store";
interface ItemProps {
  data: ListItem;
}
export function Item(props: ItemProps) {
  const { data } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(data.content);
  const updateItem = useTodoListStore((state)=>state.updateItem)
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: "list-item",
    collect(monitor) {
      return { isDragging: monitor.isDragging() };
    },
    item() {
      return {
        id: data.id,
      };
    },
  });
  useEffect(() => {
    drag(ref);
  }, []);
  return (
    <div
      className={classNames(
        "h-[100px] border-2 border-black bg-blue-300 p-[10px]",
        "flex justify-start items-center",
        "text-xl tracking-wide",
        isDragging ? "bg-white border-dashed" : ""
      )}
      onDoubleClick={() => setIsEdit(true)}
      ref={ref}
    >
      <input type="checkbox" className="w-[40px] h-[40px] mr-[10px]" checked={data.status==='done'} onChange={(e)=>{
        updateItem({
          id:data.id,
          content:data.content,
          status:e.target.checked?'done':'todo'
        })
      }}/>
      <p>
        {isEdit ? (
          <input
          className="w-140 h-20"
            onChange={(e) => {
              setEditContent(e.target.value);
            }}
            value={editContent}
            onBlur={(e)=>{
              setIsEdit(false)
              updateItem({
                id:data.id,
                content:editContent,
                status:data.status
              })
            }}
          ></input>
        ) : (
          data.content
        )}
      </p>
    </div>
  );
}
