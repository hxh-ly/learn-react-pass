import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";

interface MaterialItemProps {
  name: string;
}
const MaterialItem = ({ name }: MaterialItemProps) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: name,
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    item:{
        type:name
    }
  });
  useEffect(() => {
    drag(ref);
  }, []);
  return (
    <div
      ref={ref}
      className="border-dashed border-[1px] border-[#000] m-[10px] py-[8px] px-[10px] cursor-move inline-block bg-white hover:bg-[#ccc]"
    >
      {name}
    </div>
  );
};
export default MaterialItem;
