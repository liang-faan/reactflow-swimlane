import dagre from "@pinging/dagrejs";
import { FlowEdge, SwimlaneFlowInput } from "../types/swimlane-flow-types";
import { MarkerType, Node as ReactflowNode } from "reactflow";

const nodeWidth = 140;
const nodeHeight = 40;
const rankSep = nodeWidth; //70
const nodeSep = nodeWidth / 4; //35
const swimlaneSep = rankSep / 4; //35
// const ranker = "network-complex";
const ranker = "longest-path";

const chainEdgeSourceAndTarget = (
  currentSourceNodeId: string,
  edges: (FlowEdge | undefined)[]
): string[][] => {
  const subPaths: string[][] = [];
  const visitedNodes = new Set<string>(); // Keep track of visited nodes to avoid cycles
  // Create a stack to perform depth-first traversal iteratively
  const stack: { nodeId: string; path: string[] }[] = [{ nodeId: currentSourceNodeId, path: [] }];
  while (stack.length > 0) {
    const { nodeId, path } = stack.pop()!;
    visitedNodes.add(nodeId);
    const currentSubPaths: string[] = [];
    for (const edge of edges) {
      if (edge?.sourceNodeId === nodeId) {
        currentSubPaths.push(edge.targetNodeId);
      }
    }
    if (currentSubPaths.length > 0) {
      for (const targetNodeId of currentSubPaths) {
        if (!visitedNodes.has(targetNodeId)) {
          stack.push({ nodeId: targetNodeId, path: [...path, nodeId] });
        }
      }
    } else {
      subPaths.push([...path, nodeId]); // Add a single-node path if no outgoing edges found
    }
  }
  return subPaths;
};

const chainEdges = (
  entryEdges: (FlowEdge | undefined)[],
  innerEdges: (FlowEdge | undefined)[]
): string[][] => {
  const chainPaths = entryEdges.map((e) => {
    const currentPath = chainEdgeSourceAndTarget(e!.targetNodeId, innerEdges);
    return currentPath;
  });
  return chainPaths.flatMap((n) => n);
};

const populateNodeMaxLayer = (
  chainedEdges: string[][],
  swimlaneLayer: number
) => {
  let maxSwimlaneDepth = 0;
  const nodeLayerMap = new Map();
  chainedEdges.forEach((nodeArray) => {
    const layerDepth = nodeArray.length;
    if (layerDepth > maxSwimlaneDepth) maxSwimlaneDepth = layerDepth;
    nodeArray.forEach((n, index) => {
      if (!nodeLayerMap.has(n) || nodeLayerMap.get(n) < index + swimlaneLayer) {
        nodeLayerMap.set(n, index + swimlaneLayer);
      }
    });
  });
  return { nodeLayerMap, maxSwimlaneDepth };
};

const calculateSwimlaneAndNodes = (swimlaneFlowInputs: SwimlaneFlowInput) => {
  const { swimlanes, edges } = swimlaneFlowInputs;
  let swimlaneLayerStart: number = -1;
  const sortedSwimlanes = swimlanes.sort((s1, s2) => s1.layer - s2.layer);
  const calculatedSwimlaneNodes: any[] = sortedSwimlanes.map((sl) => {
    const { layer, nodes } = sl;
    if (swimlaneLayerStart < layer) swimlaneLayerStart = layer;
    let chainedEdges: string[][] = [];
    const swimlaneEntryEdges = edges
      .map((e) => {
        if (
          !nodes.find((n1) => n1.id === e.sourceNodeId) &&
          nodes.find((n2) => n2.id === e.targetNodeId)
        )
          return e;
        return undefined;
      })
      .filter((n) => !!n);
    const swimlaneInnerEdges = edges
      .map((e) => {
        if (
          nodes.find((n1) => n1.id === e.sourceNodeId) &&
          nodes.find((n2) => n2.id === e.targetNodeId)
        )
          return e;
        return undefined;
      })
      .filter((n) => !!n);
    if (swimlaneInnerEdges.length >= 2) {
      chainedEdges = chainEdges(swimlaneEntryEdges, swimlaneInnerEdges);
      console.warn(chainedEdges);
    }

    const { nodeLayerMap, maxSwimlaneDepth } = populateNodeMaxLayer(
      chainedEdges,
      swimlaneLayerStart
    );

    const tempLayerStart = swimlaneLayerStart;

    const swimlaneObj = {
      ...sl,
      swimlaneDepth: maxSwimlaneDepth ? maxSwimlaneDepth : 1,
      swimlaneLayerStart: tempLayerStart,
      nodes: nodes.map((n) => {
        return {
          id: n.id,
          data: {
            label: n.label,
          },
          width: nodeWidth,
          height: nodeHeight,
          style: {
            borderRadius: "8px",
            width: nodeWidth,
            height: nodeHeight,
            boxShadow: "#000000",
            backgroundColor: "#fffa93",
            textAlign: "center",
          },
          layer: nodeLayerMap.get(n.id)
            ? nodeLayerMap.get(n.id)
            : tempLayerStart,
        };
      }),
    };
    if (maxSwimlaneDepth > 0) {
      swimlaneLayerStart = swimlaneLayerStart + maxSwimlaneDepth;
    } else {
      swimlaneLayerStart++;
    }

    return swimlaneObj;
  });
  return calculatedSwimlaneNodes;
};

const convertSwimlaneNodesToReactflowNode = (swimlaneAndNodes: any[]) => {
  return swimlaneAndNodes.flatMap((n) => n.nodes).flatMap((n) => n);
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
      type: "swimlane",
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
  const calculatedSwimlaneAndNodes =
    calculateSwimlaneAndNodes(swimlaneFlowInputs);
  const inputNodes = convertSwimlaneNodesToReactflowNode(
    calculatedSwimlaneAndNodes
  );
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
    calculatedSwimlaneAndNodes: calculatedSwimlaneAndNodes,
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
  calculatedSwimlaneAndNodes: any[],
  maxXPosition: number,
  maxYPosition: number
) => {
  const sortedSwimlanes = calculatedSwimlaneAndNodes.sort(
    (s1, s2) => s1.layer - s2.layer
  );

  const swimlaneNodes = sortedSwimlanes.map((sw, index) => {
    return {
      id: sw.id,
      data: {
        label: sw.label,
        isSwimlane: true,
      },
      draggable: false,
      position: {
        x:
          rankDirection === "TB"
            ? 0
            : (nodeWidth + rankSep) * sw.swimlaneLayerStart + swimlaneSep / 2,
        y:
          rankDirection === "TB"
            ? (nodeHeight + rankSep) * sw.swimlaneLayerStart
            : 0,
      },
      style: {
        width:
          rankDirection === "TB"
            ? maxXPosition
            : (nodeWidth + rankSep) *
                (sw.swimlaneDepth > 0 ? sw.swimlaneDepth : 1) -
              swimlaneSep,
        height:
          rankDirection === "TB"
            ? (nodeHeight + rankSep) *
                (sw.swimlaneDepth > 0 ? sw.swimlaneDepth : 1) -
              swimlaneSep
            : maxYPosition,
        zIndex: -1,
        boxShadow: "#000000",
        borderRadius: "8px",
        backgroundColor: "#0d8a93",
        color: "white",
        fontSize: "1.25rem",
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
  const { g, nodes, edges, calculatedSwimlaneAndNodes } = createGraph(
    rankDirection,
    swimlaneFlowInputs
  );

  const nodesWithPosition: ReactflowNode[] = nodes.map((nd: any) => {
    const graphNode = g.node(nd.id);
    let node: ReactflowNode = {
      ...nd,
      position: {
        x: graphNode.x,
        y: graphNode.y + (rankDirection === "TB" ? nodeHeight / 2 : nodeHeight),
      },
      type: "custom",
    };
    return node;
  });

  const maxXPosition = getNodesMaxXPosition(nodesWithPosition);
  const maxYPosition = getNodesMaxYPosition(nodesWithPosition);

  const swimLaneNodes = createSwimlaneNodes(
    rankDirection,
    calculatedSwimlaneAndNodes,
    maxXPosition,
    maxYPosition
  );

  return { nodes: nodesWithPosition.concat(swimLaneNodes), edges: edges };
};

export default getGraphNodesEdges;
