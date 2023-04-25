/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import { useState } from "react";

interface PropType {
  setBirth: React.Dispatch<React.SetStateAction<string>>;
}

const container = css`
  display: flex;
  height: 10vh;
  width: 75%;
  flex-direction: column;
  .birthHeader {
    margin-bottom: 5px;
  }
`;

export default function Birth({ setBirth }: PropType) {
  const handleBirth = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setBirth(e.target.value);
  };
  return (
    <div css={container}>
      <div className="birthHeader">생년월일</div>
      <TextField
        size="small"
        className="pdInput"
        onBlur={handleBirth}
        placeholder="YYYY-MM-DD"
      />
    </div>
  );
}
