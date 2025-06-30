import type { ReactNode } from "react";
import { useComponentsStore, type Component } from "../../stores/components";
import { useComponentConfigsStore } from "../../stores/componentsConfig";
import React from "react";

export function Preview() {
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigsStore();
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
          ...init.defaultProps,
          ...item.props,
          styles: { ...item.styles },
        },
        renderComponent(item.children || [])
      );
    });
  }
  return <div>{renderComponent(components)}</div>;
}
