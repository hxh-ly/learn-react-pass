import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { useDrop } from "react-dnd";
import type { CommonComponentProps } from "../../interface";
import { Modal as AntdModal } from "antd";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
const Model = ({ children, title, styles, id }: CommonComponentProps) => {
  const { dropRef, canDrop } = useMaterialDrop(["Button", "Container"], id);
  return (
    <div
      ref={dropRef}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? "border-[2px] border-[blue]" : "border-[1px] border-[#000]"
      }`}
      style={{ ...styles }}
      data-component-id={id}
    >
      <h4>{title}</h4>
      {children}
    </div>
  );
};
export default Model;
