import dagre from "@pinging/dagrejs";
import { FlowEdge, SwimlaneFlowInput } from "./swimlane-flow-types";
import { MarkerType, Node as ReactflowNode } from "reactflow";

const nodeWidth = 140;
const nodeHeight = 40;
const rankSep = nodeWidth; //70
const nodeSep = nodeWidth / 4; //35
const swimlaneSep = rankSep / 4; //35
// const ranker = "network-complex";
const ranker = "longest-path";

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
          style: {
            borderRadius: "8px",
          },
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

const getNodesMaxXPosition = (nodes: any[]) => {
  let maxWidth = 0;
  nodes.forEach((n) => {
    if (n.position.x > maxWidth) maxWidth = n.position.x;
  });
  return maxWidth + nodeWidth + rankSep / 2;
};

const getNodesMaxYPosition = (nodes: any[]) => {
  let maxHeight = 0;
  nodes.forEach((n) => {
    if (n.position.y > maxHeight) maxHeight = n.position.y;
  });
  return maxHeight + nodeHeight + rankSep / 2;
};

const createSwimlaneNodes = (
  rankDirection: string,
  swimlaneFlowInputs: SwimlaneFlowInput,
  maxXPosition: number,
  maxYPosition: number
) => {
  const sortedSwimlanes = swimlaneFlowInputs.swimlanes.sort(
    (s1, s2) => s1.layer - s2.layer
  );

  const swimlaneNodes = sortedSwimlanes.map((sw, index) => {
    return {
      id: sw.id,
      data: {
        label: sw.label,
      },
      draggable: false,
      position: {
        x:
          rankDirection === "TB"
            ? 0
            : (nodeWidth + rankSep) * index + swimlaneSep / 2,
        y: rankDirection === "TB" ? (nodeHeight + rankSep) * index : 0,
      },
      style: {
        width:
          rankDirection === "TB"
            ? maxXPosition
            : nodeWidth + rankSep - swimlaneSep,
        height:
          rankDirection === "TB"
            ? nodeHeight + rankSep - swimlaneSep
            : maxYPosition,
        zIndex: -1,
        boxShadow: "#000000",
        borderRadius: "8px",
        backgroundColor: "#0d8a93",
        color: "white",
        textAlign:
          rankDirection === "TB" ? ("left" as const) : ("center" as const),
      },
    };
  });
  return swimlaneNodes;
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

  const maxXPosition = getNodesMaxXPosition(nodesWithPosition);
  const maxYPosition = getNodesMaxYPosition(nodesWithPosition);

  const swimLaneNodes = createSwimlaneNodes(
    rankDirection,
    swimlaneFlowInputs,
    maxXPosition,
    maxYPosition
  );

  return { nodes: nodesWithPosition.concat(swimLaneNodes), edges: edges };
};

export default getGraphNodesEdges;
