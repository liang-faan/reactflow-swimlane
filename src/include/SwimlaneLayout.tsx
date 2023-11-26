import dagre from "@pinging/dagrejs";
import { FlowEdge, SwimlaneFlowInput } from "./swimlane-flow-types";
import { MarkerType, Node as ReactflowNode } from "reactflow";

const nodeWidth = 140;
const nodeHeight = 40;
const rankSep = nodeWidth / 2;
const nodeSep = rankSep / 2;
const swimlaneSep = rankSep / 2;
const ranker = "network-complex";

const convertSwimlaneNodesToReactflowNode = (
  swimlaneFlowInputs: SwimlaneFlowInput
) => {
  const { swimlanes } = swimlaneFlowInputs;
  const nodes: any[] = swimlanes
    .map((sl) => {
      const { layer, nodes } = sl;
      return nodes.map((n) => {
        return {
          id: n.id,
          data: {
            label: n.label,
          },
          width: nodeWidth,
          height: nodeHeight,
          layer: layer,
        };
      });
    })
    .flatMap((n) => n);
  console.info(nodes);
  return nodes;
};

const getNodeById = (nodes: any[], id: string) => {
  return nodes.find((n) => n.id === id);
};

const convertSwimlaneEdgesToReactflowEdge = (
  swimlaneFlowInputs: SwimlaneFlowInput,
  inputNodes: any[]
) => {
  const { edges } = swimlaneFlowInputs;
  const convertedEdges: any[] = edges.map((e: FlowEdge) => {
    const sourceNode = getNodeById(inputNodes, e.sourceNodeId);
    const targetNode = getNodeById(inputNodes, e.targetNodeId);
    return {
      id: e.id,
      source: e.sourceNodeId,
      target: e.targetNodeId,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      sourceLayer: sourceNode.layer,
      targetLayer: targetNode.layer,
    };
  });
  return convertedEdges;
};

const getSingleDirectionEdges = (inputEdges: any[]) => {
  return inputEdges.filter((e) => e.sourceLayer < e.targetLayer);
};

const createGraph = (
  rankDirection: string,
  swimlaneFlowInputs: SwimlaneFlowInput
) => {
  const inputNodes = convertSwimlaneNodesToReactflowNode(swimlaneFlowInputs);
  const inputEdges = convertSwimlaneEdgesToReactflowEdge(
    swimlaneFlowInputs,
    inputNodes
  );
  const singleDirectionEdges = getSingleDirectionEdges(inputEdges);

  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => {
    return {};
  });
  inputNodes.forEach((n) => g.setNode(n.id, n));
  singleDirectionEdges.forEach((e) => g.setEdge(e.source, e.target));
  g.setGraph({
    ranker: ranker,
    rankdir: rankDirection,
    nodesep: nodeSep,
    ranksep: rankSep,
  });
  dagre.layout(g, { edgeLabelSpace: false });
  return {
    g,
    nodes: inputNodes,
    edges: inputEdges,
  };
};

const getGraphNodesEdges = (
  rankDirection: string,
  swimlaneFlowInputs: SwimlaneFlowInput
) => {
  const { g, nodes, edges } = createGraph(rankDirection, swimlaneFlowInputs);

  const nodesWithPosition: ReactflowNode[] = nodes.map((nd: any, index) => {
    const graphNode = g.node(nd.id);
    let node: ReactflowNode = {
      ...nd,
      position: {
        x: graphNode.x,
        y: graphNode.y + (rankDirection === "TB" ? nodeHeight / 2 : nodeHeight),
      },
      // type: "custom"
    };
    return node;
  });

  return { nodes: nodesWithPosition, edges: edges };
};

export default getGraphNodesEdges;
