/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef } from "react";
import { arc, interpolate, pie, select } from "d3";

const data = [
  [50, "red"],
  [150, "orange"],
  [100, "green"],
  [200, "blue"],
];

const info = css`
  display: flex;
  justify-content: center;
  margin-bottom: 10%;
  .container {
    display: flex;
    align-items: center;
    p {
      margin: 0;
      padding-left: 1.5vw;
      font-size: 0.9rem;
    }
  }
`;

const box = (d: any[]) => css`
  background-color: ${d[1]};
  width: 15px;
  height: 15px;
  margin-left: 5vw;
`;

const DURATION: 1000 = 1000;

function AdminHomeChart() {
  const canvas = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    const canv = select(canvas.current);
    canv.selectAll("*").remove();

    const svg = canv.append("svg").attr("width", "100%").attr("height", "32vh");
    // .style("padding-left", "8%");

    const g = svg.append("g").attr("transform", "translate(195, 120)");

    const f: any = arc()
      .innerRadius(70)
      .outerRadius(120)
      .padAngle(0.03)
      .cornerRadius(5);

    const pieGraph: any = pie()
      .sort((a: any, b: any) => b - a)
      .value((d: any) => d[0]);

    g.selectAll("path")
      .data(pieGraph(data))
      .enter()
      .append("path")
      .attr("fill", (d: any) => {
        return d.data[1];
      })
      .attr("stroke-width", "2px")
      .attr("d", f)
      .transition()
      .duration(DURATION)
      .attrTween("d", (d: any) => {
        const i = interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t: any) => f(i(t));
      });

    g.selectAll("text")
      .data(pieGraph(data))
      .enter()
      .append("text")
      .attr(
        "transform",
        (d: any) => `translate(${f.centroid(d)[0] - 13}, ${f.centroid(d)[1]})`
      )
      .attr("fill", "white")
      .attr("dy", "0.35em")
      .text((d: any) => d.data[0])
      .transition()
      .duration(DURATION)
      .attr("fill", "white");
  }, []);

  return (
    <>
      <div className="canvas" ref={canvas}></div>
      <div css={info}>
        {data.map((d: any[], index: number) => {
          return (
            <div className="container">
              <div css={box(d)}></div>
              <p>{d[0]}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AdminHomeChart;
