import { Space, Card, Divider, Button } from "antd";
import React, { CSSProperties, memo, useContext, useMemo } from "react";
import cs from "classnames";
import "./index.scss";
const sizeType = {
  small: 8,
  middle: 12,
  large: 16,
};
import SpaceContext from "./ConfigProvider";
export type SizeType = "small" | "middle" | "large" | number | undefined;
interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  size?: SizeType | SizeType[];
  split?: React.ReactNode;
  wrap?: Boolean;
  align?: "baseline" | "center" | "start" | "end";
  direction?: "vertical" | "horizontal";
}
export function MySpace(props: SpaceProps) {
  const { space } = useContext(SpaceContext);
  console.log(space.size)
  const {
    className,
    style,
    size = space.size ?? "small",
    split,
    wrap,
    align,
    direction,
    children,
  } = props;
  console.log(size)
  // 1
  const childrenNode = React.Children.toArray(children);
  const node = childrenNode.map((v: any, i) => {
    const key = (v && v.key) || `space-item-${i}`;
    return (
      <>
        <div key={key} className="space-item">
          {v}
        </div>
        {i < childrenNode.length-1 && split && (
          <span className={`${className}-split`}>{split}</span>
        )}
      </>
    );
  });
  const mergeAlign =
    direction === "horizontal" && align === undefined ? "center" : align;
  // 2
  const allClassName = cs(
    "space",
    className,
    `space-${direction}`,
    `space-${mergeAlign}`
  );
  // 3
  const otherStyle: CSSProperties = {};
  function getSize(size: SizeType) {
    return typeof size === "string" ? sizeType[size] : size;
  }
  const [hGap, vGap] = useMemo(() => {
    console.log(size)
    return (Array.isArray(size) ? size : [size, size]).map((v) => getSize(v));
  }, [size]);
  otherStyle.columnGap = hGap;
  otherStyle.rowGap = vGap;
  if (wrap) {
    otherStyle.flexWrap = "wrap";
  }
  return (
    <>
      <div className={allClassName} style={{ ...otherStyle, ...style }}>
        {node}
      </div>
    </>
  );
}
export function UseSpace() {
  return (
    <Space style={{ display: "flex" }} split={<Divider></Divider>}>
      <Card title="title1" size="small">
        <p>Card content</p>
      </Card>
      <Card title="title2" size="small">
        <p>Card content</p>
      </Card>
      <Space.Compact direction="vertical">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Space.Compact>
    </Space>
  );
}
