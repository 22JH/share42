/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const loadingStyle = css`
  display: flex;
  font-weight: 900;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function Loading() {
  return <div css={loadingStyle}>loading</div>;
}
export default Loading;
