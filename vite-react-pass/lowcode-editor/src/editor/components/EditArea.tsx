import {
  createElement,
  useEffect,
  useState,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { useComponentsStore, type Component } from "../stores/components";
import { useComponentConfigsStore } from "../stores/componentsConfig";
import { HoverMask } from "./HoverMask";
export function EditArea() {
  const { components, addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigsStore();
  console.log(components);
  const [overId, setOverId] = useState<number>();
  const handleOver: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();
    for (let i of path) {
      const comId = (i as HTMLElement).dataset?.componentId;
      if (comId) {
        setOverId(+comId);
        return;
      }
    }
  };
  const hanldeLeave: MouseEventHandler = (e) => {
    setOverId(undefined);
  };
  function renderComponent(components: Component[]): ReactNode {
    return components.map((item: Component) => {
      const init = componentConfig[item.name];
      if (!init) {
        return null;
      }
      return createElement(
        init.component,
        {
          key: item.id,
          id: item.id,
          name: item.name,
          ...init.defaultProps,
          ...item.props,
        },
        renderComponent(item.children || [])
      );
    });
  }

  return (
    <div
      className="h-[100%] edit-area"
      onMouseOver={handleOver}
      onMouseLeave={hanldeLeave}
    >
      {overId && (
        <HoverMask
          containerClassName="edit-area"
          protalWrapperClassName='protal-wrapper'
          componentId={overId}
        ></HoverMask>
      )}
      {renderComponent(components)}
      <div className="protal-wrapper"></div>
    </div>
  );
}
