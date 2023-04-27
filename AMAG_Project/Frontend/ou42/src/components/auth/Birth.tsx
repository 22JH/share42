/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import { GoCheck } from "react-icons/go";

import { useState } from "react";

interface PropType {
  setBirth: React.Dispatch<React.SetStateAction<string>>;
}

const container = css`
  display: flex;
  height: auto;
  width: 70%;
  flex-direction: column;
  .birthHeader {
    margin-bottom: 5px;
  }
`;

export default function Birth({ setBirth }: PropType) {
  const [validBirth, setValidBirth] = useState<number>(0);
  const reg = /^\d{4}-\d{2}-\d{2}$/;

  const handleBirth = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (reg.test(e?.target?.value)) {
      setBirth(() => e.target.value);
      setValidBirth(() => 1);
    } else if (e?.target?.value) {
      setValidBirth(() => 2);
      setBirth(() => "");
    }
  };
  return (
    <div css={container}>
      <div css={{ display: "flex", justifyContent: "space-between" }}>
        <div className="birthHeader">Birth </div>
        {validBirth == 1 ? <GoCheck color="#ffabab" /> : null}
      </div>
      <TextField
        size="small"
        className="pdInput"
        onBlur={handleBirth}
        placeholder="YYYY-MM-DD"
      />
      <div css={{ marginBottom: "10px" }}>
        {validBirth === 2
          ? "'-'를 포함한 OOOO-OO-OO 형식으로 작성해 주세요"
          : ""}
      </div>
    </div>
  );
}
