import { Input, Select } from "antd";
import type { ComponentEvent } from "../../../stores/componentsConfig";
import { useComponentsStore } from "../../../stores/components";

export function ShowMessage(props: { item: ComponentEvent }) {
  const { item } = props;
  const { curComponent, updateComponentProps } = useComponentsStore();
  const MessageChange = (eventName: string, value: string) => {
    if (!curComponent) {
      return;
    }
    updateComponentProps(curComponent.id, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: { ...curComponent?.props?.[eventName].config, type: value },
      },
    });
  };
  const messageTextChange = (eventName: string, value: string) => {
    if (!curComponent) {
      return;
    }
    updateComponentProps(curComponent.id, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: { ...curComponent?.props?.[eventName].config, text: value },
      },
    });
  };
  return (
    <div className="mt-10px">
      <div className="flex items-center gap-[10px]">
        <div>类型：</div>
        <div>
          <Select
            style={{ width: 160 }}
            options={[
              { label: "成功", value: "success" },
              { label: "失败", value: "error" },
            ]}
            onChange={(value) => MessageChange(item.name, value)}
            value={curComponent?.props?.[item.name]?.config?.type}
          ></Select>
        </div>
      </div>

      <div className="flex items-center gap-[10px] mt-[10px]">
        <div>文本：</div>
        <div>
          <Input
            onChange={(e) => {
              messageTextChange(item.name, e.target.value);
            }}
            value={curComponent?.props?.[item.name]?.config?.text}
          />
        </div>
      </div>
    </div>
  );
}
