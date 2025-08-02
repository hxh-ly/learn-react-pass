import {
  addEdge,
  Background,
  BackgroundVariant,
  BaseEdge,
  Controls,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  Handle,
  MiniMap,
  Panel,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { OscillatorNode } from "./component/OscillatorNode";
import { VolumeNode } from "./component/VolumeNode";
import { OutputNode } from "./component/OutputNode";
import {
  createNode,
  remoteNode,
  connect,
  disConnect,
  update,
  toggle,
} from "./audio";
const nodesType = {
  osc: OscillatorNode,
  volume: VolumeNode,
  out: OutputNode,
};
const initialNodes = [
  {
    id: "a",
    position: { x: 0, y: 0 },
    type: "osc",
    data: { frequency: 600, type: "square" },
  },
  {
    id: "b",
    type: "volume",
    position: { x: 0, y: 300 },
    data: { gain: 0.7 },
  },
  {
    id: "c",
    type: "out",
    position: { x: 0, y: 500 },
    data: {},
  },
];
const initialEdges = [];

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  console.log("Edge props:", {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });
  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // EdgeLabelRenderer 里的组件默认不处理鼠标事件，如果要处理就要声明 pointerEvents: all
            pointerEvents: "all",
          }}
        >
          <button onClick={onEdgeClick}>×</button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
export default function ReactFLowTest() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = (value: Connection) => {
    connect(value.source, value.target);
    setEdges((eds) => addEdge(value, eds));
  };
  const addOscNode = () => {
    const initNode = {
      id: Math.random().toString().slice(2, 6),
      data: {
        frequency: 200,
        type: "sine",
      },
      type: "osc",
      position: { x: 0, y: 0 },
    };
    setNodes([...nodes, initNode]);
    createNode(initNode.id, "osc", initNode.data);
  };
  const addVolumeNode = () => {
    const initNode = {
      id: Math.random().toString().slice(2, 6),
      data: {
        gain: 0.5,
      },
      type: "volume",
      position: { x: 0, y: 0 },
    };
    setNodes([...nodes, initNode]);
    createNode(initNode.id, "volume", initNode.data);
  };
  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodesType}
        edgeTypes={{
          custom: CustomEdge,
        }}
        fitView
        onNodesDelete={(nodes) => {
          nodes.forEach((v) => {
            remoteNode(v.id);
          });
        }}
        onEdgesDelete={(edges) => {
          edges.forEach((v) => {
            disConnect(v.source, v.target);
          });
        }}
      >
        <Controls></Controls>
        <MiniMap zoomable></MiniMap>
        <Background variant={BackgroundVariant.Lines}></Background>
        <Panel position="top-left">
          <button
            className={"p-[4px] rounded bg-white shadow"}
            onClick={addOscNode}
          >
            添加振荡器节点
          </button>
          <button
            className={"p-[4px] rounded bg-white shadow"}
            onClick={addVolumeNode}
          >
            添加音量节点
          </button>
        </Panel>
      </ReactFlow>
    </>
  );
}
