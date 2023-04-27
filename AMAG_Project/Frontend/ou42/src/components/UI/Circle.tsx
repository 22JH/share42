/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const circle = css`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background-color: rgba(209, 77, 114, 0.25);
  position: absolute;
  top: 50%;
  right: 35%;
  box-shadow: 0px 0px 100px 100px rgba(209, 77, 114, 0.25);
`;
export default function Circle() {
  return <div css={circle} />;
}
