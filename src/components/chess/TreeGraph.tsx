const Curve = ({ index }: { index: number }) => {
  const heights = {
    1: 40,
    2: 75,
  };

  const height = heights[index];
  const innerHeight = height - 1;

  return (
    <svg width="20" height={height} xmlns="http://www.w3.org/2000/svg">
      <path
        d={`M0,1 C20,1 1,${innerHeight} 20,${innerHeight}`}
        stroke="#1ba1e2"
        strokeWidth={2}
        fill="transparent"
      />
    </svg>
  );
};

const TreeGraph = () => {
  return (
    <div className="tree-graph border-gray-500 border-2 mb-3 rounded-md relative p-2">
      <div className="flex relative">
        <div className="dot"></div>
        <div className="junctions">
          <div className="line"></div>
          <div className="curve">
            <Curve index={1} />
          </div>
          <div className="curve">
            <Curve index={2} />
          </div>
        </div>
        <div className="moves">
          <div className="move">e4</div>
          <div className="move">d4</div>
          <div className="move">a4</div>
        </div>
        <div className="junctions">
          <div className="line"></div>
        </div>
        <div className="dot selected"></div>
        <div className="junctions">
          <div className="line"></div>
        </div>
        <div className="moves">
          <div className="move">e5</div>
        </div>
      </div>
    </div>
  );
};

export default TreeGraph;
