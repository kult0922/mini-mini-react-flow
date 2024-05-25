import "./edge.css";
type Props = {
  from: Position;
  to: Position;
};

export const EdgeComponent = ({ from, to }: Props) => {
  const c1 = {
    x: from.x + Math.abs(to.x - from.x),
    y: from.y,
  };
  const c2 = {
    x: to.x - Math.abs(to.x - from.x),
    y: to.y,
  };
  return (
    <div className="edge-wrapper">
      <svg className="svg">
        <path
          stroke="black"
          strokeWidth="2"
          fill="none"
          d={`M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`}
        />
      </svg>
    </div>
  );
};
