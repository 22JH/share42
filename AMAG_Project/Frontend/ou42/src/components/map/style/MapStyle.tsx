/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const mapStyle = css`
  & > div:nth-of-type(3) > div:nth-of-type(2) {
    left: 190px !important;
    top: -73px !important;
    transform: rotate(90deg);
  }

  & > div:nth-of-type(1) > div > div:nth-of-type(6) img {
    z-index: 6 !important;
    cursor: "pointer" !important;
  }
`;

export const OverlayListStyle = css`
  &::-webkit-scrollbar {
    display: none;
  }
`;