/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const CategorySelectStyle = css`
  select {
    width: 85%;
    height: 5vh;
    border-radius: 5px;
    border: #a5a5a5 1px solid;
    outline: 0 none;
    background: none;
    &:focus {
      border: #a5a5a5 1px solid;
    }
    color: #000000;
  }

  & option {
    color: #a5a5a5; /* 바꿀 색상 */
  }
`;

export const UserShareContentStyle = css`
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 3px solid #d14d72;
  }

  & label.Mui-focused {
    color: #d14d72;
  }
`;
