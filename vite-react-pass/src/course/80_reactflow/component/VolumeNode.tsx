import { Handle, Position } from "@xyflow/react";
import { Input } from "antd";
import { useState } from "react";
import { update } from "../audio";
export interface VolumeNodeProps {
  id: string;
  data: {
    gain: number;
  };
}

export function VolumeNode(props: VolumeNodeProps) {
  const { data, id } = props;
  const [value, setValue] = useState(data.gain + "");
  return (
    <div className="rounded-md bg-white shadow-xl">
      <Handle type="target" position={Position.Top}></Handle>
      <p className="rounded-t-md p-[8px] bg-blue-500 text-white">音量节点</p>
      <div className="flex flex-col p-[8px]">
        <span>Gain</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          className="nodrag"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            setValue(v);
            update(id, { gain: v + 0 });
          }}
        ></input>
        <p className={"text-right"}>{value}赫兹</p>
      </div>
      <Handle type="source" position={Position.Bottom}></Handle>
    </div>
  );
}
