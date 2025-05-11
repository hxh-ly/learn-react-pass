import { useState } from "react";
import { ColorPickerPanel } from "../course/35_colorPicker/ColorPicker/ColorPickerPanel";
import { Color } from "../course/35_colorPicker/ColorPicker/Color";
export function Home35() {
  const [color, setColor] = useState<Color>(new Color("rgb(23,21,34)"));
  const changeH = (event) => {
    const hsv = color.toHsv();
    let val = +event.target.value;
    console.log(val)
    setColor(new Color({
        h: val,
        s: hsv.s,
        v: hsv.v,
    }))
  };
  const changeV = (event) => {
    const hsv = color.toHsv();
    let val = +event.target.value;
    console.log(val)
    setColor(new Color({
        h: hsv.h,
        s: hsv.s,
        v: val,
    }))
  };
  return (
    <div style={{ width: "300px" }}>
      <ColorPickerPanel
        value={color}
        onChange={(c) => {
          setColor(c);
        }}
      />
      <div>
        色相：
        <input
        type='range'
          step={0.1}
          min={0}
          max={360}
          value={color.toHsv().h}
          onChange={changeH}
        ></input>
      </div>
      <div>
        明度：{" "}
        <input
        type='range'
          step={0.01}
          min={0}
          max={1}
          value={color.toHsv().v}
          onChange={changeV}
        ></input>
      </div>

      <div style={{width: 20, height: 20, background: color.toRgbString()}}></div>
    </div>
  );
}
