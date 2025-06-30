import { Collapse, Input, Select } from "antd";
import { useComponentsStore } from "../../stores/components";
import { useComponentConfigsStore } from "../../stores/componentsConfig";
import { GoToLink } from "./action/GoToLink";
import { ShowMessage } from "./action/ShowMessage";
export function ComponentEvent() {
  const { components, setCurComponent, curComponent, updateComponentProps } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigsStore();
  if (!curComponent) {
    return null;
  }
  const handleChange = (eventName: string, value: string) => {
    if (!curComponent) {
      return;
    }
    updateComponentProps(curComponent.id, { [eventName]: { type: value } });
  };

  const items = (componentConfig[curComponent.name].events || []).map(
    (item, idx) => {
      return {
        key: item.name,
        label: item.label,
        children: (
          <div>
            <div className="flex items-center">
              <div>动作:</div>
              <Select
                className="w-[160px]"
                options={[
                  { label: "显示提示", value: "showMessage" },
                  { label: "跳转链接", value: "goToLink" },
                ]}
                onChange={(value) => handleChange(item.name, value)}
                value={curComponent?.props?.[item.name]?.type}
              ></Select>
            </div>
            {curComponent?.props?.[item.name]?.type === "goToLink" && (
              <GoToLink item={item}></GoToLink>
            )}
            {curComponent?.props?.[item.name]?.type === "showMessage" && (
              <ShowMessage item={item}></ShowMessage>
            )}
          </div>
        ),
      };
    }
  );
  return (
    <div className="px-[10px]">
      <Collapse items={items} className="mb-[10px]"></Collapse>
    </div>
  );
}
