import { NodeComponent } from "../node/NodeComponent";
import { useRef, useState } from "react";
import "./board.css";

type Node = {
  id: string;
  position: Position;
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

  const selectedNodeId = useRef<string | null>(null);

  const onMouseDownNode = (id: string) => {
    selectedNodeId.current = id;
  };

  const onMouseUpBoard = () => {
    selectedNodeId.current = null;
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
          />
        ))}
      </div>
    </>
  );
}
