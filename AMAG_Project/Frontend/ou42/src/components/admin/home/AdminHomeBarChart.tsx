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

let data: any[] = [
  {
    지역이름: "서울",
    확진자수: 5607,
    격리해제수: 5050,
    사망자수: 66,
    십만명당발생율: 57.61,
    지역별확진자비율: 22.53,
  },
  {
    지역이름: "부산",
    확진자수: 491,
    격리해제수: 423,
    사망자수: 4,
    십만명당발생율: 14.39,
    지역별확진자비율: 1.97,
  },
  {
    지역이름: "대구",
    확진자수: 7141,
    격리해제수: 6933,
    사망자수: 196,
    십만명당발생율: 293.09,
    지역별확진자비율: 28.69,
  },
  {
    지역이름: "인천",
    확진자수: 976,
    격리해제수: 901,
    사망자수: 8,
    십만명당발생율: 33.02,
    지역별확진자비율: 3.92,
  },
  {
    지역이름: "광주",
    확진자수: 499,
    격리해제수: 493,
    사망자수: 3,
    십만명당발생율: 34.26,
    지역별확진자비율: 2.0,
  },
  {
    지역이름: "대전",
    확진자수: 412,
    격리해제수: 354,
    사망자수: 5,
    십만명당발생율: 27.95,
    지역별확진자비율: 1.66,
  },
  {
    지역이름: "울산",
    확진자수: 156,
    격리해제수: 144,
    사망자수: 2,
    십만명당발생율: 13.6,
    지역별확진자비율: 0.63,
  },
  {
    지역이름: "세종",
    확진자수: 78,
    격리해제수: 74,
    사망자수: 0,
    십만명당발생율: 22.79,
    지역별확진자비율: 0.31,
  },
  {
    지역이름: "경기",
    확진자수: 4744,
    격리해제수: 4277,
    사망자수: 86,
    십만명당발생율: 35.8,
    지역별확진자비율: 19.06,
  },
  {
    지역이름: "강원",
    확진자수: 231,
    격리해제수: 220,
    사망자수: 3,
    십만명당발생율: 14.99,
    지역별확진자비율: 0.93,
  },
  {
    지역이름: "충북",
    확진자수: 179,
    격리해제수: 157,
    사망자수: 1,
    십만명당발생율: 11.19,
    지역별확진자비율: 0.72,
  },
  {
    지역이름: "충남",
    확진자수: 500,
    격리해제수: 458,
    사망자수: 6,
    십만명당발생율: 23.56,
    지역별확진자비율: 2.01,
  },
  {
    지역이름: "전북",
    확진자수: 152,
    격리해제수: 123,
    사망자수: 0,
    십만명당발생율: 8.36,
    지역별확진자비율: 0.61,
  },
  {
    지역이름: "전남",
    확진자수: 176,
    격리해제수: 166,
    사망자수: 2,
    십만명당발생율: 9.44,
    지역별확진자비율: 0.71,
  },
  {
    지역이름: "경북",
    확진자수: 1570,
    격리해제수: 1490,
    사망자수: 56,
    십만명당발생율: 58.97,
    지역별확진자비율: 6.31,
  },
  {
    지역이름: "경남",
    확진자수: 297,
    격리해제수: 286,
    사망자수: 0,
    십만명당발생율: 8.84,
    지역별확진자비율: 1.19,
  },
  {
    지역이름: "제주",
    확진자수: 59,
    격리해제수: 59,
    사망자수: 0,
    십만명당발생율: 8.8,
    지역별확진자비율: 0.24,
  },
];

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

  useEffect(() => {
    const canv = select(canvas.current);
    canv.selectAll("*").remove();

    const Y = 250;
    const svgWidth = data.length * 50 + 100; // 수정된 부분

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
      .attr("fill", "hotpink")
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

    const xAxis = axisBottom(x);
    const yAxis = axisLeft(y);

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    xAxisG
      .selectAll("text")
      .attr("fill", "blue")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");
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
