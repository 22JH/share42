/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import {
  axisBottom,
  axisLeft,
  line,
  max,
  scaleBand,
  scaleLinear,
  curveBasis,
  select,
} from "d3";
import { useEffect, useRef } from "react";

import { data } from "../../SampleData";

const chartStyle = css`
  height: 100%;
  .canvas {
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .line-path {
    fill: none;
    stroke: steelblue;
  }
`;

function UserMyPageChart() {
  const canvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canv = select(canvas.current);
    canv.selectAll("*").remove();

    const Y = 250;
    const svgWidth = data.length * 50 + 100;

    const svg = canv
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", "37vh");

    const g = svg
      .append("g")
      .attr("width", "100%")
      .attr("transform", "translate(45, 50)");

    const xAxisG = g.append("g").attr("transform", `translate(0, ${Y})`);
    const yAxisG = g.append("g");

    const x: any = scaleBand()
      .domain(data.map((item) => item["지역이름"]))
      .range([0, svgWidth - 100])
      .padding(0.2);

    const y: any = scaleLinear()
      .domain([0, max(data, (d) => d["확진자수"])])
      .range([Y, 0]);

    const LINE = line()
      .x((d: any) => x(d.지역이름) + 20)
      .y((d: any) => y(d.확진자수) - 10)
      .curve(curveBasis);

    const lines = g.selectAll("path").data(data);

    lines
      .enter()
      .append("path")
      .transition()
      .duration(2000)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", "2px")
      .attr("stroke-dasharray", function () {
        const pathLength: any = this.getTotalLength();
        return `${pathLength} ${pathLength}`;
      })
      .attr("stroke-dashoffset", function () {
        const pathLength: any = this.getTotalLength();
        return `${pathLength}`;
      })

      .attr("stroke-dashoffset", 0)
      .attr("d", LINE(data));
    // .enter()
    // .append("path")
    // .attr("fill", "none")
    // .attr("stroke", "blue")
    // .attr("stroke-width", "2px")
    // .transition()
    // .duration(1000)
    // .attr("d", LINE(data));

    const xAxis = axisBottom(x).tickSizeInner(-Y).tickPadding(15);
    const yAxis = axisLeft(y)
      .tickSizeInner(-(svgWidth - 100))
      .tickPadding(10);

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    xAxisG.selectAll(".tick line").attr("opacity", 0.3);
    yAxisG.selectAll(".tick line").attr("opacity", 0.3);
  }, []);

  return (
    <div css={chartStyle}>
      <div className="canvas" ref={canvas}></div>
    </div>
  );
}

export default UserMyPageChart;
