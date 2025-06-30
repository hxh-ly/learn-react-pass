import { create } from "zustand";
import Page from "../materials/Page";
import Container from "../materials/Container";
import Button from "../materials/Button";
export interface ComponentSetter {
  type: string;
  label: string;
  name: string;
  [key: string]: any;
}
export interface ComponentConfigs {
  name: string;
  defaultProps: any;
  component: any;
  desc: string;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
}
export interface State {
  componentConfig: Record<string, ComponentConfigs>;
}
export interface Action {
  registerComponentConfig: (name: string, item: ComponentConfigs) => void;
}
export const useComponentConfigsStore = create<State & Action>((set) => ({
  componentConfig: {
    Page: {
      name: "Page",
      defaultProps: {},
      component: Page,
      desc: "页面",
    },
    Container: {
      name: "Container",
      defaultProps: {},
      component: Container,
      desc: "容器",
      stylesSetter: [
        {
          name: "width",
          type: "inputNumber",
          label: "宽度",
        },
        {
          name: "height",
          type: "inputNumber",
          label: "高度",
        },
      ],
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      component: Button,
      desc: "按钮",
      setter: [
        {
          name: "type",
          label: "按钮类型",
          type: "select",
          options: [
            { label: "主按钮", value: "primary" },
            { label: "次按钮", value: "default" },
          ],
        },
        { name: "text", label: "文本", type: "input" },
      ],
      stylesSetter: [
        {
          name: "width",
          type: "inputNumber",
          label: "宽度",
        },
        {
          name: "height",
          type: "inputNumber",
          label: "高度",
        },
      ],
    },
  },
  registerComponentConfig: (name: string, item: ComponentConfigs) => {
    set((state) => {
      return {
        ...state,
        componentConfig: { ...state.componentConfig, [name]: item },
      };
    });
  },
}));
