import "./edge.css";
type Props = {
  from: Position;
  to: Position;
};

export const EdgeComponent = ({ from, to }: Props) => {
  return (
    <div className="edge-wrapper">
      <svg className="svg">
        <path
          stroke="black"
          strokeWidth="2"
          d={`M ${from.x}, ${from.y} L ${to.x}, ${to.y}`}
        />
      </svg>
    </div>
  );
};
