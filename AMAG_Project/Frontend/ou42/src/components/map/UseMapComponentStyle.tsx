/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Map_wrap = css`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const Radius_border = css`
  border: 1px solid #fff;
  border-radius: 5px;
`;

export const Custom_typecontrol = css`
  position: absolute;
  top: 10px;
  right: 10px;
  overflow: hidden;
  width: 130px;
  height: 30px;
  margin: 0;
  padding: 0;
  z-index: 1;
  font-size: 12px;
  font-family: "Malgun Gothic", "맑은 고딕", sans-serif;

  span {
    display: block;
    width: 65px;
    height: 30px;
    float: left;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }

  .btn {
    background: #fff;
    background: linear-gradient(#fff, #e6e6e6);
  }

  .btn:hover {
    background: #f5f5f5;
    background: linear-gradient(#f5f5f5, #e3e3e3);
  }

  .btn:active {
    background: #4f63d2;
    background: linear-gradient(#4f63d2, #4f63d2);
  }

  .selected_btn {
    color: #fff;
    background: #4f63d2;
    background: linear-gradient(#4f63d2, #4f63d2);
  }

  .selected_btn:hover {
    color: #fff;
  }
`;

export const Custom_zoomcontrol = css`
  position: absolute;
  top: 50px;
  right: 10px;
  width: 36px;
  height: 80px;
  overflow: hidden;
  z-index: 1;
  background-color: #4f63d2;

  span {
    display: block;
    width: 36px;
    height: 40px;
    text-align: center;
    cursor: pointer;
  }

  span img {
    width: 15px;
    height: 15px;
    padding: 12px 0;
    border: none;
  }

  span:first-of-type {
    border-bottom: 1px solid #fff;
  }
`;