/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { contentStyle } from "../report/AdminReportContent";

import testObject from "../../../assets/testObject.jpg";

function AdminLogContents() {
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

export default AdminLogContents;
