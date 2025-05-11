import { forwardRef, useRef } from "react";
import { Color } from "./Color";
import { Handle } from "./Handle";
import { TransForm } from "./Transform";
import { useColorDrag } from "./useColorDrag";
import { calculateColor, calculateOffset } from "./utils";
export function Palette({ color,onPaletteColorChange }: { color: Color,onPaletteColorChange:(color: Color)=>void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [offset, onDragStart] = useColorDrag({
    containerRef,
    targetRef: targetRef,
    onDragChange: (offsetValue) => {
      const newColor = calculateColor({
        offset:offsetValue,
        containerRef,
        targetRef,
        color,
      });
      console.log('draging',offsetValue,newColor.toRgbString());
      onPaletteColorChange?.(newColor);
    },
    color,
    calculate:()=>{
      return calculateOffset(containerRef,targetRef,color);
    }
  });
  return (
    <div
      className={`color-picker-panel-palette`}
      ref={containerRef}
      onMouseDown={onDragStart}
    >
      <TransForm ref={targetRef} offset={{ x: offset.x, y: offset.y }}>
        <Handle color={color.toRgbString()} />
      </TransForm>
      <div
        className="color-picker-panel-palette-main"
        style={{
          backgroundColor: `hsl(${color.toHsl().h},100%, 50%)`,
          backgroundImage: `linear-gradient(0,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))`,
        }}
      ></div>
    </div>
  );
}
