import { useEffect, useRef } from "react";
import { select } from "d3";

const sampleData = [10, 20, 30, 20, 50, 2, 59];

function AdminHomeChart() {
  const canvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = select(canvas.current)
      .append("svg")
      .attr("width", "92%")
      .attr("height", "40vh")
      .style("margin-left", "8%");
    const graph = svg.selectAll("rect").data(sampleData);

    graph
      .enter()
      .append("rect")
      .attr("x", (d, index) => 40 * index)
      .attr("y", (d) => 300 - d)
      .attr("width", 30)
      .attr("height", (d) => d);
  }, []);

  return <div className="canvas" ref={canvas}></div>;
}

export default AdminHomeChart;
