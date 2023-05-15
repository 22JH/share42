/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { scaleLinear, select, arc, pie, interpolate } from "d3";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useGetUserToken } from "../../../hooks/useGetToken";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const data = [
  [50, "전국"],
  [150, "서울"],
  [100, "대전"],
  [200, "인천"],
  [250, "대구"],
  [30, "광주"],
  [170, "부산"],
  [230, "울산"],
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

const date = css`
  position: absolute;
  top: 5%;
  right: 2%;
  .MuiFormControl-root {
    width: 40%;
    margin-left: 55%;
  }
`;

const hr = css`
  border: 1px solid rgba(141, 141, 141, 0.09);
  margin-left: 4%;
`;

const title = css`
  position: absolute;
  margin: 0;
  top: 5%;
  left: 4%;
  font-size: 1.1rem;
  font-weight: 900;
`;

type Data = [number, string];

const DURATION: 1000 = 1000;

const DATE = new Date();

function UserMyPageChart() {
  const COLORINDEX = 0.1;
  const TOKEN = useGetUserToken();
  const canvas = useRef<HTMLDivElement>(null);
  const [year, setYear] = useState<number>(DATE.getFullYear());

  const test = useQuery(["user-mypage-circle-chart"], () => {
    return axios({
      method: "get",
      url: `https://www.share42-together.com/api/user/mypage/profits/{year}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  });

  const color = scaleLinear()
    .domain([0, 1])
    .range(["#fb5959", "white"] as any);

  useEffect((): any => {
    const canv = select(canvas.current);
    canv.selectAll("*").remove();

    const svg = canv.append("svg").attr("width", "100%").attr("height", "30vh");
    // .style("padding-left", "8%");

    const g = svg.append("g").attr("transform", "translate(170, 150)");

    const f: any = arc()
      .innerRadius(45)
      .outerRadius(110)
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
      .attr("fill", "black")
      .attr("dy", "5.35rem")
      .attr("font-size", "0.8rem")
      .attr("font-weight", "900")
      .attr("transform", "rotate(-20)")
      .text((d: any) => {
        if (Math.abs(d.endAngle - d.startAngle) >= 1) {
          return d.data[1];
        }
        return;
      })
      .transition()
      .duration(DURATION)
      .attr("fill", "white");
  }, []);

  const getYear = (e: any) => {
    console.log(e.$y);
  };
  return (
    <div style={{ position: "relative" }}>
      <p css={title}>수익</p>
      <div className="canvas" ref={canvas}></div>{" "}
      <div css={date}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label={'"year"'} views={["year"]} onChange={getYear} />
        </LocalizationProvider>
      </div>
      <div css={info}>
        <div css={outer}>
          {data?.map((d: any, index: number) => {
            return (
              <div className="container" key={index}>
                {/* <div css={box(color(index * COLORINDEX))}></div> */}
              </div>
            );
          })}
        </div>
      </div>
      <hr css={hr} />
    </div>
  );
}

export default UserMyPageChart;
