import "./node.css";

type Props = {
  id: string;
  position: Position;
  onMouseDownNode: (id: string) => void;
};

export const NodeComponent = ({ id, position, onMouseDownNode }: Props) => {
  const handleMouseDownNode = () => {
    onMouseDownNode(id);
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
        <div className="connector" />
        <div className="node">{id}</div>
        <div className="connector" />
      </div>
    </div>
  );
};
