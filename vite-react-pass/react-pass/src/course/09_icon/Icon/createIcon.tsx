import React, { forwardRef } from "react";
import { Icond, IconProps } from "../testIcon";

interface createIconOptionss {
  content: React.ReactNode;
  iconProps?: IconProps;
  viewBox?: string;
}

export function createIcon(options: createIconOptionss) {
  const { content, iconProps = {}, viewBox = "0 0 1024 1024" } = options;
  return forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    return (
      <Icond {...iconProps} ref={ref} {...props} viewBox={viewBox}>
        {content}
      </Icond>
    );
  });
}
