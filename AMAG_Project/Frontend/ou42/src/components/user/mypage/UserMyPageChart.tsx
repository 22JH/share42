/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { select } from "d3";
import { useEffect } from "react";

const chartStyle = css``;

const sampleData = [200, 150, 30, 100, 300, 240, 270, 70, 10];

function UserMyPageChart() {
  useEffect(() => {
    const width: 100 = 100;
    const height: 40 = 40;
    const svg = select(".canvas");

    svg.selectAll("*").remove();

    const frame = svg
      .append("svg")
      .attr("width", `${width}vw`)
      .attr("height", `${height}vh`);

    const graph1 = frame
      .append("g")
      .attr("width", "auto")
      .attr("height", "auto");

    sampleData.forEach((data, index) => {
      graph1
        .append("rect")
        .attr("height", data)
        .attr("width", 30)
        .attr("x", 40 * index)
        .attr("y", 350 - data);
    });
    // const graph2 = svg.append("g").attr("width", "auto").attr("height", "auto");
  }, []);
  return (
    <div css={chartStyle}>
      <div className="canvas"></div>
    </div>
  );
}

export default UserMyPageChart;
