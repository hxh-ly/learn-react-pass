import { CSSProperties } from "react";
import "./index.scss";
import cs from "classnames";
import { ColorType } from "./interface";
import { Color } from "./Color";
import { Palette } from "./Palette";
import { useControllableValue } from "ahooks";
type ColorPickerPanelProps = {
  className?: string;
  style?: CSSProperties;
  value?: ColorType;
  onChange?: (color: Color) => void;
};
export function ColorPickerPanel(props: ColorPickerPanelProps) {
  const { onChange } = props;
  const [colorValue, setColorValue] = useControllableValue(props);
  function onPaletteColorChange(color: Color) {
    setColorValue(color);
    onChange?.(color);
  }
  const cl = cs("color-picker", props.className);
  return (
    <div className={cl} style={props.style}>
      <Palette color={colorValue} onPaletteColorChange={onPaletteColorChange}></Palette>
    </div>
  );
}
