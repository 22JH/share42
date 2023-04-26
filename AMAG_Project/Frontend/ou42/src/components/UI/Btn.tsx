/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";

interface PropType {
  width: CSSInterpolation;
  height: CSSInterpolation;
  backGroundColor?: CSSInterpolation;
  color?: CSSInterpolation;
  content: string;
  marginRight?: CSSInterpolation;
  marginBottom?: CSSInterpolation;
  marginLeft?: CSSInterpolation;
  marginTop?: CSSInterpolation;
  onClick?: () => void;
  borderR?: CSSInterpolation;
  border?: CSSInterpolation;
  fontWeight?: CSSInterpolation;
}

export default function Btn({
  width,
  height,
  backGroundColor = "white",
  color = "black",
  content,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginTop = 0,
  onClick = () => null,
  borderR = 5,
  border = "1px solid black",
  fontWeight = 0,
}: PropType) {
  const btnStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${width};
    height: ${height};
    background-color: ${backGroundColor};
    margin-right: ${marginRight}px;
    margin-bottom: ${marginBottom}px;
    margin-left: ${marginLeft}px;
    margin-top: ${marginTop}px;
    position: relative;
    border-radius: ${borderR}px;
    border: ${border};
    font-weight: ${fontWeight};
    color: ${color};
  `;
  return (
    <div css={btnStyle} onClick={onClick}>
      {content}
    </div>
  );
}
