import { useEffect, useRef, type PropsWithChildren } from "react";
import { useComponentsStore } from "../../stores/components";
import { useComponentConfigsStore } from "../../stores/componentsConfig";
import { useDrop } from "react-dnd";
import type { CommonComponentProps } from "../../interface";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
const Container = ({ id, name, children }: CommonComponentProps) => {
  const { dropRef, canDrop } = useMaterialDrop(["Button", "Container"], id);
  return (
    <div
      ref={dropRef}
      data-component-id={id}
      className={`min-h-[100px] p-[20px] ${ canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
    >
      {children}
    </div>
  );
};
export default Container;
