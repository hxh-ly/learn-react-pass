import { Color } from "./Color";
export class RGB {
  r: number | string;
  g: number | string;
  b: number | string;
}
export class RGBA extends RGB {
  a: number | string;
}
export interface HSL {
  h: number | string;
  s: number | string;
  l: number | string;
}
export interface HSLA extends HSL {
  a: number;
}
export type ColorType = Color | number | string | RGB | RGBA | HSL | HSLA;
