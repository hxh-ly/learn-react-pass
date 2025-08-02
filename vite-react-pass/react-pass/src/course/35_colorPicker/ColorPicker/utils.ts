import { Color } from "./Color";
import { TransformOffset } from "./Transform";

export const calculateColor = (props: {
  offset: TransformOffset;
  containerRef: React.RefObject<HTMLDivElement>;
  targetRef: React.RefObject<HTMLDivElement>;
  color: Color;
}) => {
  const { offset, containerRef, targetRef, color } = props;
  const { width, height } = containerRef.current!.getBoundingClientRect();
  const { width: targetWidth, height: targetHeight } =
    targetRef.current!.getBoundingClientRect();
  const centerOffsetX = targetWidth / 2;
  const centerOffsetY = targetHeight / 2;
  const saturation = (offset.x + centerOffsetX) / width;
  const lightnewss = 1 - (offset.y + centerOffsetY) / height;
  // 明度-上下
  // 饱和度-左右

  return new Color({
    h: color.toHsv().h,
    s: saturation <= 0 ? 0 : saturation,
    v: lightnewss >= 1 ? 1 : lightnewss,
    a: color.toHsv().a,
  });
};

export const calculateOffset = (
  containerRef: React.RefObject<HTMLDivElement>,
  targetRef: React.RefObject<HTMLDivElement>,
  color: Color
) => {
  const { width, height } = containerRef.current!.getBoundingClientRect();
  const { width: targetWidth, height: targetHeight } =
    targetRef.current!.getBoundingClientRect();
  const centerOffsetX = targetWidth / 2;
  const centerOffsetY = targetHeight / 2;

  return {
    x: width * color.toHsv().s - centerOffsetX, // 为了鼠显示鼠标位置在handle中心，要减去centerOffsetX
    y: height * (1-color.toHsv().v) - centerOffsetY,
  };
};
