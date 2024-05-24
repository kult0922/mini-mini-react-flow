import "./node.css";

type Props = {
  id: string;
  position: Position;
  onMouseDownNode: (id: string) => void;
  onMouseDownConnector: (connectorPosition: Position, nodeId: string) => void;
};

export const NodeComponent = ({
  id,
  position,
  onMouseDownNode,
  onMouseDownConnector,
}: Props) => {
  const handleMouseDownNode = () => {
    onMouseDownNode(id);
  };

  const handleMouseDownConnector = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const connectorRect = e.currentTarget.getBoundingClientRect();

    onMouseDownConnector(
      {
        x: connectorRect.x + connectorRect.width / 2,
        y: connectorRect.y + connectorRect.height / 2,
      },
      id
    );
  };

  return (
    <div
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={handleMouseDownNode}
      className="node-wrapper"
    >
      <div className="node-outside">
        <div className="connector" onMouseDown={handleMouseDownConnector} />
        <div className="node">{id}</div>
        <div className="connector" onMouseDown={handleMouseDownConnector} />
      </div>
    </div>
  );
};
