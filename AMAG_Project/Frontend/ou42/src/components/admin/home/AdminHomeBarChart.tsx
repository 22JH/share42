/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef } from "react";
import {
  axisBottom,
  axisLeft,
  easeLinear,
  max,
  scaleBand,
  scaleLinear,
  select,
} from "d3";

import { data } from "../../SampleData";

const canvasStyle = css`
  .canvas {
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .btn {
    border: 0;
    background-color: #ff4f4f;
    width: 20%;
    height: 3vh;
    margin: 3% 0 0 8%;
    border-radius: 30px;
    color: white;
    font-weight: 600;
  }
  p {
    font-size: 1.3rem;
    font-weight: 900;
    color: black;
    margin: 3% 0 0 8%;
  }
`;

function AdminHomeBarChart({
  setChange,
}: {
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const canvas = useRef<HTMLDivElement>(null);
  const color = scaleLinear()
    .domain([0, 1])
    .range(["#ff4f4f", "white"] as any);

  useEffect(() => {
    const canv = select(canvas.current);
    canv.selectAll("*").remove();

    const Y = 250;
    const svgWidth = data.length * 50 + 100;

    const svg = canv
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", "37vh");
    // .style("padding-left", "8%");

    const g = svg
      .append("g")
      .attr("width", "100%")
      .attr("transform", "translate(65, 20)");

    const xAxisG = g.append("g").attr("transform", `translate(0, ${Y})`);
    const yAxisG = g.append("g");

    const x: any = scaleBand()
      .domain(data.map((item) => item["지역이름"]))
      .range([0, svgWidth - 100])
      .padding(0.2);

    const y: any = scaleLinear()
      .domain([0, max(data, (d) => d["확진자수"])])
      .range([Y, 0]);

    const bars = g.selectAll("rect").data(data);

    bars
      .enter()
      .append("rect")
      .attr("height", 0) // 초기 높이를 0으로 설정
      .attr("width", x.bandwidth)
      .attr("fill", (d, index) => color(index * 0.05))
      .attr("x", (d) => x(d["지역이름"]))
      .attr("y", Y) // 초기 위치를 Y 좌표로 설정
      .transition() // 애니메이션 시작
      .duration(1000) // 1초 동안 애니메이션 실행
      .delay((d, index) => 150 * (index + 1))
      .ease(easeLinear)
      .attr("height", (d) => Y - y(d.확진자수))
      .attr("y", (d) => y(d["확진자수"])); // 최종 위치로 이동

    bars
      .enter()
      .append("text")
      .attr("x", (d) => {
        if (d.확진자수 >= 1000) {
          return x(d.지역이름) + 8;
        } else if (d.확진자수 >= 100) {
          return x(d.지역이름) + 9;
        } else if (d.확진자수 >= 10) {
          return x(d.지역이름) + 12;
        } else if (d.확진자수 >= 1) {
          return x(d.지역이름) + 12;
        }
        return x(d.지역이름);
      })
      .attr("y", (d) => y(d.확진자수) - 5)
      .transition()
      .delay((d, index) => 1000 + 150 * (index + 1))
      .ease(easeLinear)
      .text((d) => d.확진자수)
      .attr("font-size", "12px");

    const xAxis = axisBottom(x).tickSizeInner(-Y).tickPadding(7);
    const yAxis = axisLeft(y)
      .tickSizeInner(-(svgWidth - 100))
      .tickPadding(10);

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    xAxisG
      .selectAll("text")
      .attr("fill", "black")
      .attr("transform", "rotate(-45)")
      .attr("font-weight", "900")
      .attr("text-anchor", "end")
      .attr("font-size", "0.8rem");

    xAxisG.selectAll(".tick line").attr("opacity", 0.1);
    yAxisG.selectAll(".tick line").attr("opacity", 0.1);
  }, []);

  return (
    <div css={canvasStyle}>
      <button
        className="btn"
        onClick={() => setChange((isChange) => !isChange)}
      >
        지역선택
      </button>
      <p>대구</p>
      <div className="canvas" ref={canvas}></div>
    </div>
  );
}

export default AdminHomeBarChart;
