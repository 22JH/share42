/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import testObject from "../../../assets/testObject.jpg";

const contentStyle = css`
  width: 100%;
  border-bottom: 1px solid #dddddd;
  height: 14vh;
  display: flex;

  .img {
    width: 28%;
    height: 85%;
    border-radius: 15px;
    margin: 0 5% 0 5%;
  }
  .text {
    p {
      margin: 0;
    }
    p:nth-of-type(1) {
      font-weight: 900;
      margin: 7% 0 0 0;
      font-size: 1.0625rem;
    }
    p:nth-of-type(2) {
      color: #8b8b8b;
      margin: 2% 0 0 0;
      font-weight: 500;
      font-size: 0.75rem;
    }
    p:nth-of-type(3) {
      font-size: 0.75rem;
      margin: 2% 0 0 0;
      font-weight: 300;
    }
    p:nth-of-type(4) {
      font-size: 0.75rem;
      margin: 2% 0 0 0;
      color: #bababa;
    }
  }
`;

function AdminReportContent() {
  return (
    <div css={contentStyle}>
      <img src={testObject} alt="test" className="img" />
      <div className="text">
        <p>도라이버가 부러졌어요.</p>
        <p>캔을 따다가 부러졌어요 ㅠㅠ</p>
        <p>인동잭스 · 23.04.19</p>
        <p>구미 인동</p>
      </div>
    </div>
  );
}

export default AdminReportContent;
