import { Input } from "antd";
import type { ComponentEvent } from "../../../stores/componentsConfig";
import { useComponentsStore } from "../../../stores/components";

export function GoToLink(props: { item: ComponentEvent }) {
  const { item } = props;
  const { curComponent, updateComponentProps } = useComponentsStore();
  const urlChange = (eventName: string, value: string) => {
    if (!curComponent) {
      return;
    }
    updateComponentProps(curComponent.id, {
      [eventName]: { ...curComponent?.props?.[eventName], url: value },
    });
  };
  return (
    <div className="mt-10px">
      <div className="flex items-center gap-[10px]">
        <div>链接</div>
        <div>
          <Input
            onChange={(e) => urlChange(item.name, e.target.value)}
            value={curComponent?.props?.[item.name]?.url}
          ></Input>
        </div>
      </div>
    </div>
  );
}
