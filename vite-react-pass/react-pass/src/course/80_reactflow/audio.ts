const context = new AudioContext();
const osc = context.createOscillator();
osc.type = "sine";
osc.frequency.value = 300;
osc.start();
const gain = context.createGain();
gain.gain.value = 0.2;
const out = context.destination;
type nodeType = "osc" | "volume" | "out";

const map = new Map<string, any>([
  ["a", osc],
  ["b", gain],
  ["c", out],
]);

export function isRunning() {
  return context.state === "running";
}

export function toggle() {
  console.log(isRunning());
  return isRunning() ? context.suspend() : context.resume();
}

export function update(id: string, data: Record<string, any>) {
  let node = map.get(id);
  if(!node){
    console.log('update err')
    return;
  }
  for (let [key, value] of Object.entries(data)) {
    if (node[key] instanceof AudioParam) {
      node[key].value = value;
    } else {
      node[key] = value;
    }
  }
}
export function remoteNode(id: string) {
  const node = map.get(id);
  node.disConnect();
  node.stop?.();
  map.delete(id);
}
export function connect(sourceId: string, targetId: string) {
  let sourceNode = map.get(sourceId);
  let targetNode = map.get(targetId);
  console.log(sourceId, targetId);

  sourceNode.connect(targetNode);
}

export function disConnect(sourceId: string, targetId: string) {
  let sourceNode = map.get(sourceId);
  let targetNode = map.get(targetId);
  sourceNode.disConnect(targetNode);
}

export function createNode(
  id: string,
  type: nodeType,
  data: Record<string, any>
) {
  switch (type) {
    case "osc": {
      let osc = context.createOscillator();
      osc.frequency.value = data.frequency;
      osc.type = data.type;
      osc.start();
      map.set(id, osc);
      break;
    }
    case "volume": {
      let gain = context.createGain();
      gain.gain.value = data.gain;
      map.set(id, gain);
      break;
    }
  }
}

/* 
分析：
创建多个osc节点     osc链接volume。    开始osc.start.  删除链接 osc链接volume     更新节点参数
创建多个volume节点  volume链接output   结束osc.pause  删除链接 volume链接output
创建多个output节点
*/
