import { Handle, Position } from "@xyflow/react";
import { Input } from "antd";
import { useState } from "react";
import {
  createNode,
  remoteNode,
  connect,
  disConnect,
  update,
  toggle,
} from "../audio";
export function OutputNode() {
  const [run, setRun] = useState(false);
  return (
    <div className="rounded-md bg-white  p-[20px]">
      <Handle type="target" position={Position.Top}></Handle>
      <p className="rounded-t-md p-[8px]">输出节点</p>
      <button
        onClick={(e) => {
          setRun(!run);
          toggle();
        }}
      >
        {run ? <span role="img">🔈</span> : <span role="img">🔇</span>}
      </button>
    </div>
  );
}
