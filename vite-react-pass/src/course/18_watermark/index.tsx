import { isUndefined, merge } from "lodash-es";
import {
  CSSProperties,
  useRef,
  PropsWithChildren,
  useEffect,
  useState,
  useCallback,
} from "react";

interface WaterMarkProps extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
  zIndex?: number;
  rotate?: number;
  image?: string;
  content?: string | string[];
  fontStyle?: {
    fontSize?: number | string;
    fontWeight?: number | string;
    color?: string;
    fontFamily?: string;
  };
  gap?: [number, number];
  offset?: [number, number];
  getContainer?: () => HTMLDivElement | HTMLElement;
}
type WaterOptions = Omit<WaterMarkProps, "children" | "style" | "className">;

function isNumber(o: any) {
  return Object.prototype.toString.call(o) === "[object number]" && o === o;
}
function toNumber(o?: string | number, defaultValue?: number): number {
  if (isUndefined(o)) {
    return defaultValue;
  }
  if (isNumber(o)) {
    return Number(o);
  }
  const numberVal = parseFloat(String(o));
  return isNumber(numberVal) ? numberVal : defaultValue;
}
const defaultOptions: WaterOptions = {
  rotate: -20,
  zIndex: 1,
  width: 100,
  gap: [100, 100],
  fontStyle: {
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.15)",
    fontFamily: "sans-serif",
    fontWeight: "normal",
  },
  getContainer: () => document.body,
};
function getMergeOption(o: Partial<WaterOptions>): Required<WaterOptions> {
  let options = o || {};
  let fOptions = {
    ...options,
    width: toNumber(o.width, o.image ? defaultOptions.width : undefined),
    height: toNumber(o.height, undefined)!,
    zIndex: o.zIndex || defaultOptions.zIndex,
    rotate: o.rotate || defaultOptions.rotate,
    fontStyle: { ...defaultOptions.fontStyle, ...o.fontStyle },
    gap: [
      toNumber(o.gap?.[0], defaultOptions.gap[0]),
      toNumber(o.gap?.[1] || o.gap?.[0], defaultOptions.gap[1]),
    ],
    getContainer: options.getContainer!,
  } as Required<WaterOptions>;
  const mergedOffsetX = toNumber(o.offset?.[0], 0);
  const mergedOffsetY = toNumber(o.offset?.[1], o.offset?.[0]);
  fOptions.offset = [mergedOffsetX, mergedOffsetY];
  return fOptions;
}

const getCanvasData = async (
  options: Required<WaterOptions>
): Promise<{ width: number; height: number; base64Url: string }> => {
  const { rotate, image, content, fontStyle, gap } = options;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const ratio = window.devicePixelRatio;

  const configCanvas = (size: { width: number; height: number }) => {
    const canvasWidth = gap[0] + size.width;
    const canvasHeight = gap[1] + size.height;

    canvas.setAttribute("width", `${canvasWidth * ratio}px`);
    canvas.setAttribute("height", `${canvasHeight * ratio}px`);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.translate((canvasWidth * ratio) / 2, (canvasHeight * ratio) / 2);
    ctx.scale(ratio, ratio);

    const RotateAngle = (rotate * Math.PI) / 180;
    ctx.rotate(RotateAngle);
  };

  const drawImage = async () => {
    return new Promise<{ width: number; height: number; base64Url: string }>(
      (resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.referrerPolicy = "no-referrer";
        img.src = options.image;
        img.onload = () => {
          let { width, height } = options;
          if (!width || !height) {
            if (width) {
              height = (img.height / img.width) * +width;
            } else {
              width = (img.width / img.height) * +height;
            }
          }
          configCanvas({ width, height });
          ctx.drawImage(img, -width / 2, -height / 2);
          return resolve({ base64Url: canvas.toDataURL(), width, height });
        };
        img.onerror = () => {
          drawText();
        };
      }
    );
  };

  function drawText() {
    //1.解构出字体属性
    let { color, fontWeight, fontFamily, fontSize } = fontStyle;
    //2.获取real字体
    let realFontSize = toNumber(fontSize, 0) || fontStyle.fontSize;
    console.log({ realFontSize });
    //3.设置ctx.font
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    // messageTextSize(ctx,[...content],rotate)
    const measureSize = messageTextSize(ctx, [...content], rotate);
    //4.计算宽高
    const width = options.width || measureSize.width;
    const height = options.height || measureSize.height;
    //5.config配置
    configCanvas({ width, height });
    //6.重写设置ctx.color && font && textBaseline
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    ctx.fillStyle = color!;
    ctx.textBaseline = "top";
    [...content].forEach((item, index) => {
      const { height: lineHeight, width: lineWidth } =
        measureSize.lineSize[index];
      const xStartPoint = -lineWidth / 2;
      const yStartPoint =
        -(options.height || measureSize.originHeight) / 2 + lineHeight * index;
      ctx.fillText(item, xStartPoint, yStartPoint, options.width);
    });
    //7.for文本 item xStartPoint yStartPoint width
    return Promise.resolve({ base64Url: canvas.toDataURL(), height, width });
  }
  function messageTextSize(
    ctx: CanvasRenderingContext2D,
    content: string[],
    rotate: number
  ) {
    //
    let width = 0;
    let height = 0;
    const lineSize: { width: number; height: number }[] = [];
    content.forEach((item, v) => {
      const {
        width: textWidth,
        fontBoundingBoxAscent,
        fontBoundingBoxDescent,
      } = ctx.measureText(item);
      const textHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;
      if (textWidth > width) {
        width = textWidth;
      }
      height += textHeight;
      lineSize.push({ width: textWidth, height: textHeight });
    });
    const angle = (rotate * Math.PI) / 180;
    return {
      originWidth: width,
      originHeight: height,
      width: Math.ceil(
        Math.abs(Math.sin(angle) * height) + Math.abs(Math.cos(angle) * width)
      ),
      height: Math.ceil(
        Math.abs(Math.sin(angle) * width) + Math.abs(height * Math.cos(angle))
      ),
      lineSize,
    };
  }

  return image ? drawImage() : drawText();
};

export function useWaterMark(waterMarkOptions?: Partial<WaterOptions>) {
  const [state, setState] = useState<Partial<WaterOptions>>(
    waterMarkOptions ?? {}
  );
  console.log(typeof state.getContainer);
  const mergeOptions = getMergeOption(state);
  const watermarkDiv = useRef(null);
  const moRef = useRef<MutationObserver>(null);
  const container = mergeOptions.getContainer();
  const { zIndex, gap } = mergeOptions;
  function drawWaterMark() {
    // canvas相关的
    if (!container) {
      return;
    }
    getCanvasData(mergeOptions).then(({ base64Url, width, height }) => {
      const wmStyle = `
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        pointer-events: none;
        z-index:${zIndex};
        background-position: 0 0;
        background-size:${gap[0] + width}px ${gap[1] + height}px;
        background-repeat: repeat;
        background-image:url(${base64Url})`;

      if (!watermarkDiv.current) {
        const div = document.createElement("div");
        watermarkDiv.current = div;
        container.append(div);
        container.style.position = "relative";
      }

      watermarkDiv.current?.setAttribute("style", wmStyle.trim());
      if (container) {
        console.log(container)
        moRef.current?.disconnect();
        moRef.current = new MutationObserver((mutations) => {
          console.log("in mutationObserver callback");
          let hasChange = mutations.some((v) => {
            let flag = false;
            if (v.removedNodes.length) {
              flag = Array.from(v.removedNodes).some((item) => {
                return item === watermarkDiv.current;
              });
            }
            if (v.type === "attributes" && v.target === watermarkDiv.current) {
              flag = true;
            }
            return flag;
          });
          if (hasChange) {
            console.log('reChange')
            watermarkDiv.current = undefined; // 水印clear，repaint
            drawWaterMark();
          }
        });
        moRef.current.observe(container, {
          childList: true,
          attributes: true,
          subtree: true,
        });
      }
    });
  }
  useEffect(() => {
    drawWaterMark();
  }, [state]);

  function generateWark(newOptions: Partial<WaterOptions>) {
    setState(merge({}, mergeOptions, newOptions));
  }
  function destory() {}
  return [generateWark, destory];
}
export function WaterMark(props: WaterMarkProps) {
  const {
    className,
    style,
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
  } = props;
  const wmRef = useRef<HTMLDivElement>(null);
  const getContainer = useCallback(() => {
    return props.getContainer ? props.getContainer() : wmRef.current!;
  }, [props.getContainer, wmRef.current]);
  const [generateWark] = useWaterMark({
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
    getContainer,
  });
  useEffect(() => {
    generateWark({
      zIndex,
      width,
      height,
      rotate,
      image,
      content,
      fontStyle,
      gap,
      offset,
      getContainer,
    });
  }, [
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    JSON.stringify(fontStyle),
    JSON.stringify(gap),
    JSON.stringify(offset),
    getContainer,
  ]);
  return (
    <>
      {props.children ? (
        <div className={className} style={style} ref={wmRef}>
          {props.children}
        </div>
      ) : null}
    </>
  );
}
