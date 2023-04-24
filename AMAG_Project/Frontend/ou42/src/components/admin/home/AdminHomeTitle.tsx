/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const titleStyle = css`
  p:nth-of-type(1) {
    color: #0cdee8;
    font-weight: 900;
    font-size: 1.5625rem;
    margin: 15% 0 0 8%;
  }
  p:nth-of-type(2) {
    font-size: 1.4rem;
    margin: 0 0 7% 8%;
    font-weight: 900;
    color: #000000;
  }
`;

function AdminHomeTitle() {
  return (
    <div css={titleStyle}>
      <p>
        관리자<span style={{ color: "black" }}>님</span>
      </p>
      <p>안녕하세요</p>
    </div>
  );
}

export default AdminHomeTitle;
