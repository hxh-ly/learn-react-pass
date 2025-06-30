import { message } from "antd";
import { useEffect, useRef, type PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import type { CommonComponentProps } from "../../interface";
import { useComponentConfigsStore } from "../../stores/componentsConfig";
import { useComponentsStore } from "../../stores/components";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
const Page = ({ id, children, styles }: CommonComponentProps) => {
  return (
    <div
      data-component-id={id}
      className="p-[20px]"
      style={{ ...styles }}
    >
      {children}
    </div>
  );
};
export default Page;
