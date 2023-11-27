import {
  ConnectionLineType,
  HandleElement,
  Node,
  Position,
  internalsSymbol,
} from "reactflow";
import { SpecialPathParams } from "../types/swimlane-flow-types";

export function findIntermediateNode(
  sourceNode: Node,
  targetNode: Node,
  reactflowNodes: Node[],
  isHorizontal: boolean
) {
  if (isHorizontal) {
    const sx = sourceNode.position.x;
    const tx = targetNode.position.x;
    const horizontalIntermediateNode = reactflowNodes.find(
      (rn) =>
        !rn.data.isSwimlane &&
        Math.abs(rn.position.y - sourceNode.position.y) < 10 &&
        (sx > tx
          ? rn.position.x > tx && rn.position.x < sx
          : rn.position.x > sx && rn.position.x < tx)
    );
    return horizontalIntermediateNode;
  } else {
    const sy = sourceNode.position.y;
    const ty = targetNode.position.y;
    const verticalIntermediateNode = reactflowNodes.find(
      (rn) =>
        !rn.data.isSwimlane &&
        Math.abs(rn.position.x - sourceNode.position.x) < 10 &&
        (sy > ty
          ? rn.position.y > ty && rn.position.y < sy
          : rn.position.y > sy && rn.position.y < ty)
    );
    return verticalIntermediateNode;
  }
}

function getNodeCenter(node: Node) {
  return {
    x: node.positionAbsolute!.x + node.width! / 2,
    y: node.positionAbsolute!.y + node.height! / 2,
  };
}

function getHandleCoordsByPosition(node: any, handlePosition: Position) {
  // all handles are from type source, that's why we use handleBounds.source here
  const handle = node[internalsSymbol].handleBounds.source.find(
    (h: HandleElement) => h.position === handlePosition
  );

  let offsetX = handle.width / 2;
  let offsetY = handle.height / 2;

  // this is a tiny detail to make the markerEnd of an edge visible.
  // The handle position that gets calculated has the origin top-left, so depending which side we are using, we add a little offset
  // when the handlePosition is Position.Right for example, we need to add an offset as big as the handle itself in order to get the correct position
  switch (handlePosition) {
    case Position.Left:
      offsetX = 0;
      break;
    case Position.Right:
      offsetX = handle.width;
      break;
    case Position.Top:
      offsetY = 0;
      break;
    case Position.Bottom:
      offsetY = handle.height;
      break;
  }

  const x = node.positionAbsolute.x + handle.x + offsetX;
  const y = node.positionAbsolute.y + handle.y + offsetY;

  return [x, y];
}

export function getEdgeParams(
  sourceNode: Node,
  targetNode: Node,
  reactflowNodes: Node[]
) {
  const sourceCenter = getNodeCenter(sourceNode);
  const targetCenter = getNodeCenter(targetNode);

  const horizontalDiff = targetCenter.x - sourceCenter.x;
  const verticalDiff = targetCenter.y - sourceCenter.y;

  const absHorizontalDiff = Math.abs(horizontalDiff);
  const absVerticalDiff = Math.abs(verticalDiff);

  let sourcePosition: Position,
    targetPosition: Position,
    type = ConnectionLineType.Bezier;

  if (
    absVerticalDiff < 10 &&
    findIntermediateNode(sourceNode, targetNode, reactflowNodes, true)
  ) {
    sourcePosition = horizontalDiff > 0 ? Position.Right : Position.Left;
    targetPosition = horizontalDiff > 0 ? Position.Left : Position.Right;
    type = ConnectionLineType.SmoothStep;
  } else if (
    absHorizontalDiff < 10 &&
    findIntermediateNode(sourceNode, targetNode, reactflowNodes, false)
  ) {
    sourcePosition = verticalDiff > 0 ? Position.Bottom : Position.Top;
    targetPosition = verticalDiff > 0 ? Position.Top : Position.Bottom;
    type = ConnectionLineType.SmoothStep;
  } else if (absHorizontalDiff > absVerticalDiff) {
    sourcePosition = horizontalDiff > 0 ? Position.Right : Position.Left;
    targetPosition = horizontalDiff > 0 ? Position.Left : Position.Right;
  } else {
    sourcePosition = verticalDiff > 0 ? Position.Bottom : Position.Top;
    targetPosition = verticalDiff > 0 ? Position.Top : Position.Bottom;
  }

  const [sx, sy] = getHandleCoordsByPosition(sourceNode, sourcePosition);
  const [tx, ty] = getHandleCoordsByPosition(targetNode, targetPosition);
  return [sx, sy, tx, ty, sourcePosition, targetPosition, type];
}

export function getSwimlaneCurvePath(
  points: SpecialPathParams
): [
  path: string,
  labelX: number,
  labelY: number,
  offsetX: number,
  offsetY: number
] {
  const { sourceX, sourceY, targetX, targetY, offset } = points;

  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;
  if (Math.abs(sourceX - targetX) < 10) {
    const tempOffset = sourceY > targetY ? -1 * offset : offset;
    return [
      `M${sourceX} ${sourceY} Q${sourceX + tempOffset} ${
        centerY - tempOffset / 2
      } ${targetX} ${targetY}`,
      sourceX,
      sourceY,
      centerX,
      centerY,
    ];
  }

  const tempOffset2 = sourceX > targetX ? -1 * offset : offset;
  return [
    `M${sourceX} ${sourceY} Q${centerX + tempOffset2} ${
      centerY + tempOffset2
    } ${targetX} ${targetY}`,
    sourceX,
    sourceY,
    centerX,
    centerY,
  ];
}
