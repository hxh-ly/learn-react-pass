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
const initialNodes = [
  { id: 1 + "", position: { x: 0, y: 0 }, type: "red", data: { label: "1" } },
  {
    id: 2 + "",
    position: { x: 0, y: 100 },
    type: "blue",
    data: { label: "2" },
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2", type: "custom" }];
interface NodeProps {
  data: {
    label: string;
  };
}
function RedNode(props: NodeProps) {
  return (
    <div
      style={{ background: "red", width: 50, height: 50, textAlign: "center" }}
    >
      {props.data.label}
      <Handle type="source" position={Position.Bottom}></Handle>
      <Handle type="target" position={Position.Top}></Handle>
    </div>
  );
}
function BlueNode(props: NodeProps) {
  return (
    <div
      style={{ background: "blue", width: 50, height: 50, textAlign: "center" }}
    >
      {props.data.label}
      <Handle type="source" position={Position.Bottom}></Handle>
      <Handle type="target" position={Position.Top}></Handle>
    </div>
  );
}
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
export function ReactFLowTest() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = (value: Connection) => {
    console.log(value);
    setEdges((eds) => addEdge(value, eds));
  };
  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{
          red: RedNode,
          blue: BlueNode,
        }}
        edgeTypes={{
          custom: CustomEdge,
        }}
      >
        {/*   <Controls></Controls>
        <MiniMap zoomable></MiniMap>
        <Background variant={BackgroundVariant.Lines}></Background> */}
        <Panel position="top-right">
          <button
            onClick={() => {
              setNodes([
                ...nodes,
                {
                  id: Math.random().toString().slice(2, 6),
                  position: { x: 0, y: 0 },
                  type: "red",
                  data: { label: "1" },
                },
              ]);
            }}
          >
            add
          </button>
        </Panel>
      </ReactFlow>
    </>
  );
}
