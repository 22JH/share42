/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";

interface PropType {
  width: CSSInterpolation;
  height: CSSInterpolation;
  color: CSSInterpolation;
  content: string;
}

export default function Btn({ width, height, color, content }: PropType) {
  const btnStyle = css`
    width: ${width}%;
    height: ${height}%;
    background-color: ${color};
    position: relative;
    border-radius: 5px;
  `;
  return <button css={btnStyle}>{content}</button>;
}
