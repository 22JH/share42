/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";

interface PropType {
  width: CSSInterpolation;
  height: CSSInterpolation;
  color: CSSInterpolation;
  content: string;
  marginRight?: CSSInterpolation;
  marginBottom?: CSSInterpolation;
  marginLeft?: CSSInterpolation;
  marginTop?: CSSInterpolation;
  onClick?: any;
}

export default function Btn({
  width,
  height,
  color,
  content,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginTop = 0,
  onClick = () => null,
}: PropType) {
  const btnStyle = css`
    width: ${width}%;
    height: ${height}%;
    background-color: ${color};
    margin-right: ${marginRight}px;
    margin-bottom: ${marginBottom}px;
    margin-left: ${marginBottom}px;
    margin-top: ${marginBottom}px;
    position: relative;
    border-radius: 5px;
  `;
  return (
    <button css={btnStyle} onClick={onClick}>
      {content}
    </button>
  );
}
