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
  borderR?: CSSInterpolation;
  border?: CSSInterpolation;
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
  borderR = 5,
  border = "1px solid black",
}: PropType) {
  const btnStyle = css`
    text-align: center;
    width: ${width}%;
    height: ${height}%;
    background-color: ${color};
    margin-right: ${marginRight}px;
    margin-bottom: ${marginBottom}px;
    margin-left: ${marginLeft}px;
    margin-top: ${marginTop}px;
    position: relative;
    border-radius: ${borderR}px;
    border: ${border};
  `;
  return (
    <div css={btnStyle} onClick={onClick}>
      {content}
    </div>
  );
}
