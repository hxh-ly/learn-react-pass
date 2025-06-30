import type { ReactNode } from "react";
import { useComponentsStore, type Component } from "../../stores/components";
import { useComponentConfigsStore } from "../../stores/componentsConfig";
import React from "react";
import { message } from "antd";

export function Preview() {
  const [messageApi, contextHolder] = message.useMessage();
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigsStore();
  function handleEvent(component: Component) {
    const props: Record<string, any> = {};
    componentConfig[component.name].events?.forEach((item) => {
      const eventName = component.props[item.name];
      if (eventName) {
        const { type } = eventName;
        console.log(type, item.name);
        props[item.name] = () => {
          if (type === "goToLink" && eventName.url) {
            window.location.href = eventName.url;
          } else if (type === "showMessage" && eventName.config) {
            console.log("~~~");
            if (eventName.config.type === "success") {
              messageApi.success(eventName.config.text, 1000);
            } else if (eventName.config.type === "error") {
              messageApi.error(eventName.config.text, 1000);
            }
          }
        };
      }
    });
    console.log(props);
    return props;
  }
  function renderComponent(components: Component[]): ReactNode {
    return components.map((item: Component) => {
      const init = componentConfig[item.name];
      if (!init.prod) {
        return null;
      }
      return React.createElement(
        init.prod,
        {
          key: item.id,
          id: item.id,
          name: item.name,
          ...item.props,
          ...handleEvent(item),
          styles: { ...item.styles },
        },
        renderComponent(item.children || [])
      );
    });
  }
  return (
    <div>
      {contextHolder}
      {renderComponent(components)}
    </div>
  );
}
