import "./node.css";

type Props = {
  id: string;
  position: Position;
};

export const NodeComponent = ({ id, position }: Props) => {
  return (
    <div
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
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
