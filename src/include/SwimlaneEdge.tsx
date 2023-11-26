import { useCallback } from "react";
import {
  useStore,
  getBezierPath,
  ConnectionLineType,
  useNodes,
} from "reactflow";
import { getEdgeParams, getSwimlaneCurvePath } from "../utils/Utils";

export function SwimlaneEdge(props: any) {
  const { id, source, target, markerEnd, style } = props;
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  const reactflowNodes = useNodes();

  if (!sourceNode || !targetNode) return null;

  const [sx, sy, tx, ty, sourcePosition, targetPosition, type] = getEdgeParams(
    sourceNode,
    targetNode,
    reactflowNodes
  );

  const [edgePath] =
    type === ConnectionLineType.SmoothStep
      ? getSwimlaneCurvePath({
          sourceX: sx,
          sourceY: sy,
          targetX: tx,
          targetY: ty,
          offset: sourceNode.width! / 2,
        })
      : getBezierPath({
          sourceX: sx,
          sourceY: sy,
          targetX: tx,
          targetY: ty,
          sourcePosition: sourcePosition,
          targetPosition: targetPosition,
        });
  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
      style={style}
    />
  );
}
