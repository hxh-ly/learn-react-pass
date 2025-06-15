import classNames from "classnames"
import { FC, useEffect, useRef } from "react"
import { useDrag } from "react-dnd"

interface NewItemProps{
    className?: string | string[]
}

export const NewItem: FC<NewItemProps> = (props) => {
   const [{isDragging},drag] =  useDrag(({
        type:'new-item',
        collect(monitor) {
            return {
                isDragging:monitor.isDragging()
            }
        },
    }))
    const ref = useRef(null);
    const cs = classNames(
        "h-[100px] border-2 border-black",
        "leading-[100px] text-center text-2xl",
        "bg-green-300",
        "cursor-move select-none",
        isDragging?"border-dashed bg-white":"",
        props.className
    );
    useEffect(()=>{
        drag(ref)
    },[])
    return <div ref={ref} className={cs}>新的待办事项</div>
}