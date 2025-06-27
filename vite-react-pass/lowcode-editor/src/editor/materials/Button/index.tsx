import type { PropsWithChildren } from "react";
import { Button as AntdButton } from "antd";
import type { ButtonType } from "antd/es/button";
import type { CommonComponentProps } from "../../interface";
export interface ButtonProps {
  type: ButtonType;
  text: string;
}
const Button = ({ type, id, text }: CommonComponentProps) => {
  return (
    <AntdButton data-component-id={id} type={type}>
      {text}
    </AntdButton>
  );
};
export default Button;
