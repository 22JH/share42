/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { arc, interpolate, pie, select, scaleLinear } from "d3";
import { useQueryClient } from "react-query";
import { useEffect, useRef } from "react";

import { Change } from "../../../routes/admin/AdminHome";

// const data = [
//   [50, "전국"],
//   [150, "서울"],
//   [100, "대전"],
//   [200, "인천"],
//   [250, "대구"],
//   [30, "광주"],
//   [170, "부산"],
//   [230, "울산"],
// ];

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
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  p {
    font-weight: 900;
  }
`;

const box = (d: any) => css`
  background-color: ${d};
  width: 15px;
  height: 15px;
  margin-left: 5vw;
`;

type Data = [number, string];

const DURATION: 1000 = 1000;

function AdminHomeCircleChart({
  setChange,
  data,
}: {
  setChange: React.Dispatch<React.SetStateAction<Change>>;
  data?: Data[];
}) {
  const canvas = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const COLORINDEX = 0.3;

  const color = scaleLinear()
    .domain([0, 1])
    .range(["#fb5959", "white"] as any);

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
      .attr("fill", (d: any, index: number): any => {
        return color(index * COLORINDEX);
      })
      .attr("stroke-width", "2px")
      .attr("d", f)
      .on("click", (event: any, d: any) => {
        setChange((change) => {
          return { region: d.data[1], isChange: !change.isChange };
        });
      })
      .transition()
      .duration(DURATION)
      .attrTween("d", (d: any) => {
        const i = interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t: any) => f(i(t));
      });

    // g.selectAll("text")
    //   .data(pieGraph(data))
    //   .enter()
    //   .append("text")
    //   .attr(
    //     "transform",
    //     (d: any) => `translate(${f.centroid(d)[0] - 10}, ${f.centroid(d)[1]})`
    //   )
    //   .attr("fill", "black")
    //   .attr("dy", "5.35rem")
    //   .attr("font-size", "0.8rem")
    //   .attr("font-weight", "900")
    //   .attr("transform", "rotate(-20)")
    //   .text((d: any) => {
    //     if (Math.abs(d.endAngle - d.startAngle) >= 1) {
    //       return d.data[1];
    //     }
    //     return;
    //   })
    //   .on("click", (event: any, d: any) => {
    //     setChange((change) => {
    //       return { region: d.data[1], isChange: !change.isChange };
    //     });
    //   })
    //   .transition()
    //   .duration(DURATION)
    //   .attr("fill", "white");

    function midAngle(d: any) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    g.selectAll("text")
      .data(pieGraph(data))
      .enter()
      .append("text")
      .attr("fill", "black")
      .attr("dy", "0.35rem")
      .attr("font-size", "0.8rem")
      .attr("font-weight", "900")
      .style("text-anchor", (d) => (midAngle(d) < Math.PI ? "start" : "end"))
      .text((d: any) => {
        return d.data[1];
      })
      .transition()
      .duration(DURATION)
      .attr("transform", (d) => {
        const [x, y] = f.centroid(d);
        return `translate(${x},${y})`;
      })
      .attr("fill", "white");
  }, []);

  const goToBar = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const value = (e.target as HTMLElement).textContent;

    setChange((change) => {
      return { region: value!, isChange: !change.isChange };
    });
  };

  return (
    <div>
      <div className="canvas" ref={canvas}></div>
      <div css={info}>
        <div css={outer}>
          {data?.map((d: Data, index: number) => {
            return (
              <div className="container" key={index}>
                <div css={box(color(index * COLORINDEX))}></div>
                <p onClick={goToBar}>{d[1]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminHomeCircleChart;
