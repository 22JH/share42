/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import {
  axisBottom,
  axisLeft,
  easeLinear,
  max,
  scaleBand,
  scaleLinear,
  select,
} from "d3";
import { useEffect, useRef } from "react";

import { Change } from "../../../routes/admin/AdminHome";

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

interface Data {
  count: number;
  lockerStation: number;
  sido: string;
  stationName: string;
}

function AdminHomeBarChart({
  setChange,
  data,
}: {
  setChange: React.Dispatch<React.SetStateAction<Change>>;
  data?: Data[];
}) {
  const canvas = useRef<HTMLDivElement>(null);
  const color = scaleLinear()
    .domain([0, 1])
    .range(["#ff4f4f", "white"] as any);

  useEffect(() => {
    const canv = select(canvas.current);
    canv.selectAll("*").remove();

    const Y = 250;
    const svgWidth = data!.length * 50 + 100;

    const svg = canv
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", "38vh");
    // .style("padding-left", "8%");

    const g = svg
      .append("g")
      .attr("width", "100%")
      .attr("transform", "translate(65, 20)");

    const xAxisG = g.append("g").attr("transform", `translate(0, ${Y})`);
    const yAxisG = g.append("g");

    const x: any = scaleBand()
      .domain(data!.map((item: Data) => item.stationName))
      .range([0, svgWidth - 100])
      .padding(0.2);

    const y: any = scaleLinear()
      .domain([0, Math.max(...data!.map((d) => d.count))])
      .range([Y, 0]);

    const bars = g.selectAll("rect").data(data!);

    bars
      .enter()
      .append("rect")
      .attr("height", 0) // 초기 높이를 0으로 설정
      .attr("width", x.bandwidth)
      .attr("fill", (d, index) => color(index * 0.05))
      .attr("x", (d) => x(d.stationName))
      .attr("y", Y) // 초기 위치를 Y 좌표로 설정
      .transition() // 애니메이션 시작
      .duration(1000) // 1초 동안 애니메이션 실행
      .delay((d, index) => 150 * (index + 1))
      .ease(easeLinear)
      .attr("height", (d) => Y - y(d.count))
      .attr("y", (d) => y(d.count)); // 최종 위치로 이동

    bars
      .enter()
      .append("text")
      .attr("x", (d: Data) => {
        if (d.count >= 1000) {
          return x(d.stationName) + 8;
        } else if (d.count >= 100) {
          return x(d.stationName) + 9;
        } else if (d.count >= 10) {
          return x(d.stationName) + 12;
        } else if (d.count >= 1) {
          return x(d.stationName) + 12;
        }
        return x(d.stationName);
      })
      .attr("y", (d) => y(d.count) - 5)
      .transition()
      .delay((d, index) => 1000 + 150 * (index + 1))
      .ease(easeLinear)
      .text((d) => d.count)
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
      .attr("word-break", "pre-wrap")
      .style("overflow-wrap", "anywhere")
      .attr("font-size", (d: any) => {
        const length = d.length;
        if (length >= 10) {
          return "0.6rem";
        }
        return "0.6rem";
      });

    xAxisG.selectAll(".tick line").attr("opacity", 0.1);
    yAxisG.selectAll(".tick line").attr("opacity", 0.1);
  }, [data]);

  return (
    <div css={canvasStyle}>
      <button
        className="btn"
        onClick={() =>
          setChange((change) => {
            return { ...change, isChange: !change.isChange };
          })
        }
      >
        지역선택
      </button>
      <p>{data ? data[0].sido : null}</p>
      <div className="canvas" ref={canvas}></div>
    </div>
  );
}

export default AdminHomeBarChart;
