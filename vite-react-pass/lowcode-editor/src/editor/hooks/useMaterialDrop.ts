import { useEffect, useRef } from "react";
import { useComponentsStore } from "../stores/components";
import { useComponentConfigsStore } from "../stores/componentsConfig";
import { useDrop } from "react-dnd";

export function useMaterialDrop(accept: string[], id: number) {
  const dropRef = useRef(null);
  const { addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigsStore();
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: accept,
    drop(item: { type: string }, monitor) {
      if (monitor.didDrop()) {
        return;
      }
      const comp = componentConfig[item.type];
      if (comp) {
        addComponent(
          {
            id: new Date().getTime(),
            props: comp.defaultProps,
            name: item.type,
            desc:comp.desc
          },
          id
        );
      }
    },
    collect(monitor) {
      return {
        canDrop: monitor.canDrop(),
      };
    },
  }));
   useEffect(() => {
    drop(dropRef);
  }, []);
  return {dropRef,canDrop}
}
