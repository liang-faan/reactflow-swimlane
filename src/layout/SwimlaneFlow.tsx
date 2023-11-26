import React, { useEffect, useState } from "react";
import getGraphNodesEdges from "../include/SwimlaneLayout";
import ReactFlow, {
  ConnectionMode,
  Controls,
  Panel,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import { SwimlaneFlowInput } from "../include/swimlane-flow-types";
import { Button } from "@mui/material";

const SwimlaneFlow = (props: {
  rankDirection: string;
  selectedFlow: SwimlaneFlowInput | null | undefined;
}) => {
  const { rankDirection, selectedFlow } = props;
  const { fitView } = useReactFlow();

  const [rankDir, setRankDir] = useState(rankDirection);
  const [reactflowNodes, setReactflowNodes, onNodesChange] = useNodesState([]);
  const [reactflowEdges, setReactflowEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const setReactflowNodesEdges = (direction: string) => {
      const { nodes, edges } = getGraphNodesEdges(direction, selectedFlow!);
      setReactflowNodes(nodes);
      setReactflowEdges(edges);
    };
    setReactflowNodesEdges(rankDir);
  }, [selectedFlow, rankDir, setReactflowNodes, setReactflowEdges]);

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
      <Panel position="top-right">
        <Button
          onClick={() => setRankDir("TB")}
          variant="contained"
          className="Panel-Button"
        >
          To to Bottom
        </Button>{" "}
        <Button
          onClick={() => setRankDir("LR")}
          variant="contained"
          className="Panel-Button"
        >
          Left to Right
        </Button>
      </Panel>
      <Controls />
    </ReactFlow>
  );
};

export default SwimlaneFlow;
