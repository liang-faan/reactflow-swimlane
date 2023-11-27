import { SwimlaneFlowInput } from "../include/swimlane-flow-types";
const SAMPLE_FLOW: SwimlaneFlowInput[] = [
  {
    id: "sample 1",
    swimlanes: [
      {
        id: "S1",
        name: "Swimlane A",
        label: "Swimlane A",
        layer: 0,
        nodes: [
          {
            id: "A1",
            name: "Node A1",
            code: "NodeA1",
            label: "NODEA1",
          },
          {
            id: "A2",
            name: "Node A2",
            label: "Node A2",
            code: "NODEA1",
          },
          {
            id: "A3",
            name: "Node A3",
            label: "Node A3",
            code: "NODEA1",
          },
          {
            id: "A4",
            name: "Node A4",
            label: "Node A4",
            code: "NODEA1",
          },
          {
            id: "A5",
            name: "Node A5",
            label: "Node A5",
            code: "NODEA1",
          },
          {
            id: "A6",
            name: "Node A6",
            label: "Node A6",
            code: "NODEA1",
          },
        ],
      },
      {
        id: "S2",
        name: "Swimlane B",
        label: "Swimlane B",
        layer: 1,
        nodes: [
          {
            id: "B1",
            name: "Node B1",
            code: "NodeB1",
            label: "NODEB1",
          },
          {
            id: "B2",
            name: "Node B2",
            label: "Node B2",
            code: "NODEB1",
          },
          {
            id: "B3",
            name: "Node B3",
            label: "Node B3",
            code: "NODEB1",
          },
          {
            id: "B4",
            name: "Node B4",
            label: "Node B4",
            code: "NODEB1",
          },
          {
            id: "B5",
            name: "Node B5",
            label: "Node B5",
            code: "NODEB1",
          },
          {
            id: "B6",
            name: "Node B6",
            label: "Node B6",
            code: "NODEB1",
          },
        ],
      },
      {
        id: "S3",
        name: "Swimlane C",
        label: "Swimlane C",
        layer: 2,
        nodes: [
          {
            id: "C1",
            name: "Node C1",
            code: "NodeC1",
            label: "NODEC1",
          },
          {
            id: "C2",
            name: "Node C2",
            label: "Node C2",
            code: "NODEC1",
          },
          {
            id: "C3",
            name: "Node C3",
            label: "Node C3",
            code: "NODEC1",
          },
          {
            id: "C4",
            name: "Node C4",
            label: "Node C4",
            code: "NODEC1",
          },
          {
            id: "C5",
            name: "Node C5",
            label: "Node C5",
            code: "NODEC1",
          },
          {
            id: "C6",
            name: "Node C6",
            label: "Node C6",
            code: "NODEC1",
          },
        ],
      },
      {
        id: "S4",
        name: "Swimlane D",
        label: "Swimlane D",
        layer: 3,
        nodes: [
          {
            id: "D1",
            name: "Node D1",
            code: "NodeD1",
            label: "NODED1",
          },
          {
            id: "D2",
            name: "Node D2",
            label: "Node D2",
            code: "NODED1",
          },
          {
            id: "D3",
            name: "Node D3",
            label: "Node D3",
            code: "NODED1",
          },
          {
            id: "D4",
            name: "Node D4",
            label: "Node D4",
            code: "NODED1",
          },
          {
            id: "D5",
            name: "Node D5",
            label: "Node D5",
            code: "NODED1",
          },
          {
            id: "D6",
            name: "Node D6",
            label: "Node D6",
            code: "NODED1",
          },
        ],
      },
      {
        id: "S5",
        name: "Swimlane F",
        label: "Swimlane F",
        layer: 4,
        nodes: [
          {
            id: "F1",
            name: "Node F1",
            code: "NodeF1",
            label: "NOFEF1",
          },
          {
            id: "F2",
            name: "Node F2",
            label: "Node F2",
            code: "NOFEF1",
          },
          {
            id: "F3",
            name: "Node F3",
            label: "Node F3",
            code: "NOFEF1",
          },
          {
            id: "F4",
            name: "Node F4",
            label: "Node F4",
            code: "NOFEF1",
          },
          {
            id: "F5",
            name: "Node F5",
            label: "Node F5",
            code: "NOFEF1",
          },
          {
            id: "F6",
            name: "Node F6",
            label: "Node F6",
            code: "NOFEF1",
          },
        ],
      },
      {
        id: "S6",
        name: "Swimlane E",
        label: "Swimlane E",
        layer: 5,
        nodes: [
          {
            id: "E1",
            name: "Node E1",
            code: "NodeE1",
            label: "NOEEE1",
          },
          {
            id: "E2",
            name: "Node E2",
            label: "Node E2",
            code: "NOEEE1",
          },
          {
            id: "E3",
            name: "Node E3",
            label: "Node E3",
            code: "NOEEE1",
          },
          {
            id: "E4",
            name: "Node E4",
            label: "Node E4",
            code: "NOEEE1",
          },
          {
            id: "E5",
            name: "Node E5",
            label: "Node E5",
            code: "NOEEE1",
          },
          {
            id: "E6",
            name: "Node E6",
            label: "Node E6",
            code: "NOEEE1",
          },
        ],
      },
      {
        id: "S7",
        name: "Swimlane G",
        label: "Swimlane G",
        layer: 6,
        nodes: [
          {
            id: "G1",
            name: "Node G1",
            code: "NodeG1",
            label: "NOGGG1",
          },
          {
            id: "G2",
            name: "Node G2",
            label: "Node G2",
            code: "NOGGG1",
          },
          {
            id: "G3",
            name: "Node G3",
            label: "Node G3",
            code: "NOGGG1",
          },
          {
            id: "G4",
            name: "Node G4",
            label: "Node G4",
            code: "NOGGG1",
          },
          {
            id: "G5",
            name: "Node G5",
            label: "Node G5",
            code: "NOGGG1",
          },
          {
            id: "G6",
            name: "Node G6",
            label: "Node G6",
            code: "NOGGG1",
          },
        ],
      },
    ],
    edges: [
      {
        id: "edge1-2",
        sourceNodeId: "A1",
        targetNodeId: "A2",
      },
      {
        id: "edgeA1-D2",
        sourceNodeId: "A1",
        targetNodeId: "D2",
      },
      {
        id: "edgeA3-G3",
        sourceNodeId: "A3",
        targetNodeId: "G3",
      },
      {
        id: "edgeA3-B3",
        sourceNodeId: "A3",
        targetNodeId: "B3",
      },
      {
        id: "edge1-4",
        sourceNodeId: "A1",
        targetNodeId: "B4",
      },
      {
        id: "edgeF12-B1",
        sourceNodeId: "F2",
        targetNodeId: "B1",
      },
      {
        id: "edge1-5",
        sourceNodeId: "A1",
        targetNodeId: "E5",
      },
      {
        id: "edge2-4",
        sourceNodeId: "B2",
        targetNodeId: "C4",
      },
      {
        id: "edge2-6",
        sourceNodeId: "C2",
        targetNodeId: "F6",
      },
      {
        id: "edge5-6",
        sourceNodeId: "E5",
        targetNodeId: "F6",
      },
      {
        id: "edge6-4",
        sourceNodeId: "F6",
        targetNodeId: "G4",
      },
    ],
  },
  {
    id: "Sample 2",
    swimlanes: [
      {
        id: "S21",
        layer: 0,
        label: "Swimlane 21",
        nodes: [
          {
            id: "S21-1",
            name: "Node S211",
            label: "Node S211",
            code: "NODES211",
          },
        ],
      },
      {
        id: "S22",
        label: "Swimlane 22",
        layer: 1,
        nodes: [
          {
            id: "S22-1",
            name: "Node S221",
            label: "Node S221",
            code: "NODES221",
          },
        ],
      },
    ],
    edges: [
      {
        id: "S211-S221",
        sourceNodeId: "S21-1",
        targetNodeId: "S22-1",
      },
    ],
  },
  {
    id: "Sample 3",
    swimlanes: [
      {
        id: "S3-1",
        label: "Mindmap Root",
        layer: 0,
        nodes: [
          {
            id: "S3-1-M1",
            label: "Root",
            code: "ROOT",
          },
        ],
      },
      {
        id: "S3-2",
        label: "Mindmap Level 1",
        layer: 1,
        nodes: [
          {
            id: "S3-2-M1",
            label: "Child 1",
            code: "CHILD1",
          },
          {
            id: "S3-2-M2",
            label: "Child 2",
            code: "CHILD2",
          },
        ],
      },
      {
        id: "S3-3",
        label: "Mindmap Level 2",
        layer: 2,
        nodes: [
          {
            id: "S3-3-M1",
            label: "Child 1",
            code: "CHILD1",
          },
          {
            id: "S3-3-M2",
            label: "Child 2",
            code: "CHILD2",
          },
          {
            id: "S3-3-M3",
            label: "Child 3",
            code: "CHILD4",
          },
          {
            id: "S3-3-M4",
            label: "Child 4",
            code: "CHILD4",
          },
        ],
      },
    ],
    edges: [
      {
        id: "E-S3-1-M1-S3-2-M1",
        sourceNodeId: "S3-1-M1",
        targetNodeId: "S3-2-M1",
      },
      {
        id: "E-S3-1-M1-S3-2-M2",
        sourceNodeId: "S3-1-M1",
        targetNodeId: "S3-2-M2",
      },
      //
      {
        id: "E-S3-2-M1-S3-3-M1",
        sourceNodeId: "S3-2-M1",
        targetNodeId: "S3-3-M1",
      },
      {
        id: "E-S3-2-M1-S3-3-M2",
        sourceNodeId: "S3-2-M1",
        targetNodeId: "S3-3-M2",
      },
      {
        id: "E-S3-2-M1-S3-3-M3",
        sourceNodeId: "S3-2-M1",
        targetNodeId: "S3-3-M3",
      },
      {
        id: "E-S3-2-M1-S3-3-M4",
        sourceNodeId: "S3-2-M1",
        targetNodeId: "S3-3-M4",
      },
      {
        id: "E-S3-2-M2-S3-3-M3",
        sourceNodeId: "S3-2-M2",
        targetNodeId: "S3-3-M3",
      },
      {
        id: "E-S3-2-M2-S3-3-M4",
        sourceNodeId: "S3-2-M2",
        targetNodeId: "S3-3-M4",
      },
      {
        id: "E-S3-2-M2-S3-3-M2",
        sourceNodeId: "S3-2-M2",
        targetNodeId: "S3-3-M2",
      },
      {
        id: "E-S3-2-M2-S3-3-M1",
        sourceNodeId: "S3-2-M2",
        targetNodeId: "S3-3-M1",
      },
      {
        id: "E-S3-3-M3-S3-1-M1",
        targetNodeId: "S3-3-M3",
        sourceNodeId: "S3-1-M1",
      },
      {
        id: "E-S3-3-M2-S3-1-M1",
        targetNodeId: "S3-3-M2",
        sourceNodeId: "S3-1-M1",
      },
    ],
  },
  {
    id: "Loop Sample",
    edges: [
      {
        id: "1",
        sourceNodeId: "N1",
        targetNodeId: "N2",
      },
      {
        id: "2",
        sourceNodeId: "N2",
        targetNodeId: "N3",
      },
      {
        id: "3",
        sourceNodeId: "N3",
        targetNodeId: "N4",
      },
      {
        id: "4",
        sourceNodeId: "N4",
        targetNodeId: "N5",
      },
      {
        id: "5",
        sourceNodeId: "N5",
        targetNodeId: "N6",
      },
      {
        id: "6",
        sourceNodeId: "N6",
        targetNodeId: "N7",
      },
      {
        id: "7",
        sourceNodeId: "N7",
        targetNodeId: "N8",
      },
      {
        id: "8",
        sourceNodeId: "N8",
        targetNodeId: "N1",
      },
      // {
      //   id: "9",
      //   sourceNodeId: "N2",
      //   targetNodeId: "N6",
      // },
      // {
      //   id: "10",
      //   sourceNodeId: "N7",
      //   targetNodeId: "N3",
      // },
    ],
    swimlanes: [
      {
        id: "1",
        label: "Lan1",
        layer: 0,
        nodes: [
          {
            id: "N1",
            label: "Start",
          },
          {
            id: "N8",
            label: "End",
          },
        ],
      },
      {
        id: "2",
        label: "Lan2",
        layer: 1,
        nodes: [
          {
            id: "N2",
            label: "Station 1",
          },
          {
            id: "N7",
            label: "Station 6",
          },
        ],
      },
      {
        id: "3",
        label: "Lan3",
        layer: 2,
        nodes: [
          {
            id: "N3",
            label: "Station 2",
          },
          {
            id: "N6",
            label: "Station 5",
          },
        ],
      },
      {
        id: "4",
        label: "Lan4",
        layer: 3,
        nodes: [
          {
            id: "N4",
            label: "Station 3",
          },
          {
            id: "N5",
            label: "Station 4",
          },
        ],
      },
    ],
  },
];
export { SAMPLE_FLOW };
