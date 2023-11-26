export interface BasicObject {
  id: string;
  name?: string;
  label?: string;
}

export interface SwimlaneNode extends BasicObject {
  defaultColor?: string;
  code: string;
}
export interface Swimlane extends BasicObject {
  nodes: SwimlaneNode[] | [];
  layer: number;
}

export interface FlowEdge extends BasicObject {
  sourceNodeId: string;
  targetNodeId: string;
}

export interface SwimlaneFlowInput extends BasicObject {
  swimlanes: Swimlane[] | [];
  edges: FlowEdge[] | [];
}
