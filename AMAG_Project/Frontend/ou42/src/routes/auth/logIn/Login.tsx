/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const container = css`
  height: 100%;
  background-color: pink;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
`;

export default function Login() {
  return (
    <div css={container}>
      <div className="header">공유사이</div>
      <div className="loginWindow">
        <div className="userOrAdmin"></div>
        <div className="textWindow">
          <div className="idTxt"></div>
          <div className="pwdTxt"></div>
        </div>
      </div>
    </div>
  );
}
