/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import { useState } from "react";

interface PropType {
  setPd: React.Dispatch<React.SetStateAction<string>>;
}

const container = css`
  display: flex;
  height: auto;
  width: 75%;
  flex-direction: column;
  .pdHeader {
    margin-bottom: 5px;
  }
  .pdInput {
    margin-bottom: 10px;
  }
`;

export default function PasswordCheck({ setPd }: PropType) {
  const [pdCheck1, setPdCheck1] = useState<string>("");
  const [pdCheck2, setPdCheck2] = useState<string>("");
  const [validPd, setValidPd] = useState("");

  const handlePdCheck1 = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setPdCheck1(e.target.value);
  };
  const handlePdCheck2 = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setPdCheck2(e.target.value);
    if (pdCheck1 === pdCheck2) {
      setValidPd(() => "비밀번호가 동일합니다");
    }
  };

  return (
    <div css={container}>
      <div className="pdHeader">Password</div>
      <TextField
        size="small"
        className="pdInput"
        onBlur={handlePdCheck1}
        placeholder="비밀번호를 입력해주세요"
        type="password"
      />

      <div className="pdHeader">Confirm</div>
      <TextField
        size="small"
        className="pdInput"
        onBlur={handlePdCheck2}
        placeholder="비밀번호를 확인해 주세요"
        type="password"
      />
      <div>{validPd}</div>
    </div>
  );
}
