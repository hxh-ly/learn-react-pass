import { Handle, Position } from "@xyflow/react";
import { Input } from "antd";
import { useState } from "react";
import { update } from "../audio";

export interface OscillatorNodeProps {
  id: string;
  data: {
    frequency: number;
    type: string;
  };
}

export function OscillatorNode(props: OscillatorNodeProps) {
  const { data, id } = props;
  const [frequency, setFrequency] = useState(data.frequency);
  const [type, setType] = useState(data.type);
  return (
    <div className="bg-white shadow-xl">
      <p className="rounded-t-md p-[8px] bg-pink-500 text-white">振荡器节点</p>
      <div className="flex flex-col p-[8px]">
        <span>频率</span>
        <input
          type="range"
          min="10"
          max="1000"
          className="nodrag"
          onChange={(e) => {
            setFrequency(+e.target.value);
            update(id, { frequency: +e.target.value, type });
          }}
          value={frequency}
        ></input>
        <span className={"text-right"}>{frequency}赫兹</span>
      </div>
      <hr className="mx-[4px]"></hr>
      <div className="flex flex-col p-[8px]">
        <p>波形</p>
        <select
          value={type}
          onChange={(e) => {
            const type = e.target.value;
            setType(type);
            update(id, { frequency: frequency, type });
          }}
        >
          <option value="sine">正弦波</option>
          <option value="triangle">三角波</option>
          <option value="sawtooth">锯齿波</option>
          <option value="square">方波</option>
        </select>
      </div>
      <Handle type="source" position={Position.Bottom}></Handle>
    </div>
  );
}
