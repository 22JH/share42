/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const container = css`
  width: 100%;
  height: 100vh;
  border: 1px solid black;
`;

export default function UserChat() {
  return (
    <div css={container}>
      <h1>채팅</h1>
    </div>
  );
}
