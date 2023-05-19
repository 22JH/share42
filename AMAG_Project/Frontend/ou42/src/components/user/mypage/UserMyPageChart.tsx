/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useQueryClient, useQuery } from "react-query";
import { scaleLinear, select, arc, pie, interpolate } from "d3";

import { L, pipe, takeAll } from "../../../custom/FxJS";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useGetUserToken } from "../../../hooks/useGetToken";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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

const empty = css`
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  p {
    font-weight: 900;
    margin-bottom: 10%;
    span {
      color: #ffabab;
    }
  }
`;

const table = css`
  display: flex;
  justify-content: center;

  .table {
    height: "7vh";
    animation-name: show;
    animation-duration: 1s;

    th {
      background-color: #ffabab;
      color: white;
    }

    td {
      width: 25vw;
      background-color: #ffecec;
      text-align: center;
    }

    @keyframes show {
      0% {
        transform: translate(0, -50px);
        opacity: 0;
      }
      100% {
        transform: translate(0, 0);
        opacity: 1;
      }
    }
  }
`;

type Data = [number, string];

const DURATION: 1000 = 1000;
const DATE = new Date();
function UserMyPageChart() {
  const COLORINDEX = 0.1;
  const TOKEN = useGetUserToken();
  const queryClient = useQueryClient();
  const canvas = useRef<HTMLDivElement>(null);
  const [year, setYear] = useState<number>(DATE.getFullYear());
  const [month, setMonth] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cost, setCost] = useState<number>(0);

  const apiFnc = () => {
    return axios({
      method: "get",
      url: `https://www.share42-together.com/api/user/mypage/profits/${year}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  };

  const { data } = useQuery(["user-mypage-circle-chart"], apiFnc, {
    select: (data: any) => {
      const newData = pipe(L.map, takeAll);
      return newData(
        (d: { month: string; price: number }) => [d.price, `${+d.month}월`],
        data.data.message
      );
    },
  });

  const color = scaleLinear()
    .domain([0, 1])
    .range(["#fb5959", "white"] as any);

  useEffect((): any => {
    const canv = select(canvas.current);
    canv.selectAll("*").remove();

    const svg = canv.append("svg").attr("width", "100%").attr("height", "30vh");
    // .style("padding-left", "8%");

    const g = svg.append("g").attr("transform", "translate(210, 150)");

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
      .on("click", (event: any, d: any) => {
        setCost(d.data[0]);
        setMonth(d.data[1]);
        setIsOpen((isOpen) => !isOpen);
      })
      .transition()
      .duration(DURATION)
      .attrTween("d", (d: any) => {
        const i = interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t: any) => f(i(t));
      });

    function midAngle(d: any) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    // g.selectAll("text")
    //   .data(pieGraph(data))
    //   .enter()
    //   .append("text")
    //   .text((d: any, i) => d.data[1]) // 텍스트를 원하는 데이터로 바꾸며, 이 예시에서는 d.data[1]을 사용했습니다.
    //   .attr("transform", (d) => {
    //     const [x, y] = f.centroid(d);
    //     return `translate(${x},${y})`;
    //   })
    //   .style("text-anchor", (d) => (midAngle(d) < Math.PI ? "start" : "end"))
    //   .attr("dy", ".35rem");

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
      .on("click", (event: any, d: any) => {
        setCost(d.data[0]);
        setMonth(d.data[1]);
        setIsOpen((isOpen) => !isOpen);
      })
      .transition()
      .duration(DURATION)
      .attr("transform", (d) => {
        const [x, y] = f.centroid(d);
        return `translate(${x},${y})`;
      })
      .attr("fill", "white");
  }, [data]);

  useLayoutEffect(() => {
    queryClient.prefetchQuery(["user-mypage-circle-chart"], apiFnc);
  }, [year]);

  const getYear = (e: any) => {
    setYear(e.$y);
  };

  const showTable = (index: number) => {
    setCost(data[index][0]);
    setMonth(data[index][1]);
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div style={{ position: "relative" }}>
      <p css={title}>수익</p>
      {data?.length !== 0 ? (
        <div className="canvas" ref={canvas}></div>
      ) : (
        <div css={empty}>
          <p>
            <span>거래</span>가 없어요...
          </p>
        </div>
      )}

      <div css={date}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label={"YEAR"} views={["year"]} onChange={getYear} />
        </LocalizationProvider>
      </div>

      {data?.length !== 0 ? (
        <div css={info}>
          <div css={outer}>
            {data?.map((d: any, index: number) => {
              return (
                <div className="container" key={index}>
                  <div css={box(color(index * COLORINDEX))}></div>
                  <p onClick={() => showTable(index)}>{d[1]}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {isOpen ? (
        <div css={table}>
          <table className="table">
            <thead>
              <th>년</th>
              <th>월</th>
              <th>수익</th>
            </thead>
            <tbody>
              <tr>
                <td>{year}</td>
                <td>{month}</td>
                <td>{cost}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}

      <hr css={hr} />
    </div>
  );
}

export default UserMyPageChart;
