import { Modal, Segmented } from "antd";
import type { ComponentEvent } from "../../stores/componentsConfig";
import { GoToLink, type GotoLinkConfig } from "./action/GoToLink";
import { ShowMessage, type ShowMessageConfig } from "./action/ShowMessage";
import { useState } from "react";
import { useComponentsStore } from "../../stores/components";

interface ModelProps {
  visiable: boolean;
  event?: ComponentEvent;
  handleOK: (config?: GotoLinkConfig | ShowMessageConfig) => void;
  handleCancel: () => void;
}

export function ActionModel({ visiable, handleOK, handleCancel }: ModelProps) {
  const { curComponent } = useComponentsStore();
  if (!curComponent) {
    return;
  }
  const [curConfig, setCurConfig] = useState<
    GotoLinkConfig | ShowMessageConfig
  >();
  const [key, setKey] = useState<string>("访问链接");
  return (
    <>
      <Modal
        title="事件动作配置"
        width={800}
        open={visiable}
        onOk={() => handleOK(curConfig)}
        onCancel={handleCancel}
        okText="添加"
        cancelText="取消"
      >
        <div className="h-[500px]">
          <Segmented
            value={key}
            onChange={(value) => setKey(value)}
            block
            options={["访问链接", "消息提示", "自定义JS"]}
          ></Segmented>
          <div className="pt-[20px] h-[calc(100vh-60px-30px-20px)]">
            {key === "访问链接" && (
              <GoToLink
                onChange={(config) => {
                  setCurConfig(config);
                }}
              />
            )}
            {key === "消息提示" && (
              <ShowMessage
                onChange={(config) => {
                  setCurConfig(config);
                }}
              />
            )}
            {/* {key === "自定义JS" && <ComponentEvent />} */}
          </div>
        </div>
      </Modal>
    </>
  );
}
