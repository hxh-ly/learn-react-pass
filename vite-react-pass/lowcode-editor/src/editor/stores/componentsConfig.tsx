import { create } from "zustand";
import PageDev from "../materials/Page/dev";
import PageProd from "../materials/Page/prod";
import ContainerDev from "../materials/Container/dev";
import ContainerProd from "../materials/Container/prod";
import ButtonDev from "../materials/Button/dev";
import ButtonProd from "../materials/Button/prod";
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
  dev: any;
  prod: any;
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
      component: PageDev,
      dev: PageDev,
      prod: PageProd,
      desc: "页面",
    },
    Container: {
      name: "Container",
      defaultProps: {},
      component: ContainerDev,
      dev: ContainerDev,
      prod: ContainerProd,
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
      component: ButtonDev,
      dev: ButtonDev,
      prod: ButtonProd,
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
