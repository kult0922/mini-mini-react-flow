import { NodeComponent } from "../node/NodeComponent";
import { EdgeComponent } from "../edge/EdgeComponent";
import { useRef, useState } from "react";
import "./board.css";

type Node = {
  id: string;
  position: Position;
};

type Edge = {
  id: string;
  start: Position;
  end: Position;
  startNodeId?: string;
  endNodeId?: string;
};

export function Board() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "node1",
      position: { x: 100, y: 150 },
    },
    {
      id: "node2",
      position: { x: 400, y: 100 },
    },
  ]);

  const [newEdge, setNewEdge] = useState<Edge | null>(null);
  const selectedNodeId = useRef<string | null>(null);
  const selectedEdgeId = useRef<string | null>(null);

  const onMouseDownNode = (id: string) => {
    selectedNodeId.current = id;
  };

  const onMouseUpBoard = () => {
    selectedNodeId.current = null;
    selectedEdgeId.current = null;
    setNewEdge(null);
  };

  const onMouseDownConnector = (
    connectorPosition: Position,
    nodeId: string
  ) => {
    const edgeId = `edge-${new Date().getTime()}`;
    selectedEdgeId.current = edgeId;
    setNewEdge({
      id: edgeId,
      start: {
        x: connectorPosition.x,
        y: connectorPosition.y,
      },
      end: {
        x: connectorPosition.x,
        y: connectorPosition.y,
      },
      startNodeId: nodeId,
      endNodeId: undefined,
    });
  };

  const onMouseMoveBoard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (selectedNodeId.current) {
      const node = nodes.find((node) => node.id === selectedNodeId.current);
      if (!node) return;

      // ドラッグ中のノードの位置を更新
      setNodes(
        nodes.map((node) =>
          node.id === selectedNodeId.current
            ? {
                ...node,
                position: {
                  x: node.position.x + e.movementX,
                  y: node.position.y + e.movementY,
                },
              }
            : node
        )
      );
    }

    if (selectedEdgeId.current && newEdge) {
      setNewEdge({
        ...newEdge,
        end: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    }
  };

  return (
    <>
      <div
        className="board"
        onMouseMove={onMouseMoveBoard}
        onMouseUp={onMouseUpBoard}
        onMouseLeave={onMouseUpBoard}
      >
        {nodes.map((node) => (
          <NodeComponent
            key={node.id}
            id={node.id}
            position={node.position}
            onMouseDownNode={onMouseDownNode}
            onMouseDownConnector={onMouseDownConnector}
          />
        ))}

        {selectedEdgeId.current && newEdge && (
          <EdgeComponent from={newEdge.start} to={newEdge.end} />
        )}
      </div>
    </>
  );
}
