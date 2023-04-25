/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import TextField from "@mui/material/TextField";

interface PropType {
  setId: React.Dispatch<React.SetStateAction<string>>;
}

const container = css`
  display: flex;
  height: auto;
  width: 75%;
  flex-direction: column;
  margin-bottom: 10px;
  .idHeader {
    font-size: 1rem;
    margin-bottom: 5px;
  }
`;

export default function IdCheck({ setId }: PropType) {
  const [validId, setValidId] = useState<string>("");

  const idHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setId(e?.target?.value);
  };

  return (
    <div css={container}>
      <div css={{ display: "flex", justifyContent: "space-between" }}>
        <div className="idHeader">ID</div>
        <div className="checked">{validId}</div>
      </div>
      <TextField
        size="small"
        onBlur={idHandler}
        placeholder="아이디를 입력해 주세요."
      />
    </div>
  );
}
