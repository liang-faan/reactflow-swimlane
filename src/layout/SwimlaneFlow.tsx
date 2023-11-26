import React, { useEffect } from "react";
import getGraphNodesEdges from "../include/SwimlaneLayout";
import ReactFlow, {
  ConnectionMode,
  Controls,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import { SwimlaneFlowInput } from "../include/swimlane-flow-types";

const SwimlaneFlow = (props: {
  rankDirection: string;
  selectedFlow: SwimlaneFlowInput | null | undefined;
}) => {
  const { rankDirection, selectedFlow } = props;
  const { fitView } = useReactFlow();

  const [reactflowNodes, setReactflowNodes, onNodesChange] = useNodesState([]);
  const [reactflowEdges, setReactflowEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const setReactflowNodesEdges = (direction: string) => {
      const { nodes, edges } = getGraphNodesEdges(direction, selectedFlow!);
      setReactflowNodes(nodes);
      setReactflowEdges(edges);
    };
    setReactflowNodesEdges(rankDirection);
  }, [selectedFlow, rankDirection, setReactflowNodes, setReactflowEdges]);

  useEffect(() => {
    fitView();
  }, [reactflowEdges, reactflowNodes, fitView]);
  return (
    <ReactFlow
      nodes={reactflowNodes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      edges={reactflowEdges}
      fitView
      connectionMode={ConnectionMode.Loose}
    >
      <Controls />
    </ReactFlow>
  );
};

export default SwimlaneFlow;
