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
    width: ${width};
    height: ${height};
    color: ${color};
  `;
  return <button>{content}</button>;
}
