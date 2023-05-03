/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef } from "react";
import { arc, interpolate, pie, select } from "d3";

const data = [
  [50, "red", "전국"],
  [150, "orange", "서울"],
  [100, "green", "대전"],
  [200, "tomato", "인천"],
  [250, "blue", "대구"],
  [30, "purple", "광주"],
  [170, "black", "부산"],
  [230, "lightgreen", "울산"],
];

const info = css`
  display: flex;
  width: 100%;
  margin-bottom: 10%;
  justify-content: center;
  .container {
    display: flex;
    align-items: center;
    padding-top: 3%;
    p {
      margin: 0;
      padding-left: 1.5vw;
      font-size: 0.9rem;
    }
  }
`;

const outer = css`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const box = (d: any[]) => css`
  background-color: ${d[1]};
  width: 15px;
  height: 15px;
  margin-left: 5vw;
`;

const DURATION: 1000 = 1000;

function AdminHomeCircleChart({
  setChange,
}: {
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const canvas = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    const canv = select(canvas.current);
    canv.selectAll("*").remove();

    const svg = canv.append("svg").attr("width", "100%").attr("height", "32vh");
    // .style("padding-left", "8%");

    const g = svg.append("g").attr("transform", "translate(195, 130)");

    const f: any = arc()
      .innerRadius(55)
      .outerRadius(120)
      .padAngle(0.025)
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
      .on("click", (event: any, d: any) => {
        setChange((isChange) => !isChange);
      }) // 이 부분을 추가합니다.
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
        (d: any) => `translate(${f.centroid(d)[0] - 10}, ${f.centroid(d)[1]})`
      )
      .attr("fill", "white")
      .attr("dy", "0.35em")
      .attr("font-size", "0.8rem")
      .attr("font-weight", "900")
      .text((d: any) => {
        if (d.data[0] >= 100) {
          return d.data[2];
        }
        return;
      })
      .transition()
      .duration(DURATION)
      .attr("fill", "white");
  }, []);

  return (
    <div>
      <div className="canvas" ref={canvas}></div>
      <div css={info}>
        <div css={outer}>
          {data.map((d: any[], index: number) => {
            return (
              <div className="container" key={index}>
                <div css={box(d)}></div>
                <p>{d[2]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminHomeCircleChart;
