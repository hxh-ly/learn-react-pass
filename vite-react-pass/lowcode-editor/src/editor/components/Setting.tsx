import { Segmented } from "antd";
import { useComponentsStore } from "../stores/components";
import { useState } from "react";
import { ComponentAttr } from "./Setting/ComponentAttr";
import { ComponentStyle } from "./Setting/ComponentStyle";
import { ComponentEvent } from "./Setting/ComponentEvent";
export function Setting() {
  const { components, curComponent, curComponentId } = useComponentsStore();
  const [key, setKey] = useState("属性");
  if (!curComponent) {
    return;
  }
  return (
    <div>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={["属性", "样式", "事件"]}
      ></Segmented>
      <div>
        {key==='属性'&& <ComponentAttr/> }
        {key==='样式'&& <ComponentStyle/>}
        {key==='事件'&& <ComponentEvent/>}
      </div>
    </div>
  );
}
