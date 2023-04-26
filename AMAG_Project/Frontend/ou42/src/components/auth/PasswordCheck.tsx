/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { GoCheck } from "react-icons/go";
import TextField from "@mui/material/TextField";

interface PropType {
  setPd: React.Dispatch<React.SetStateAction<string>>;
}

const container = css`
  display: flex;
  height: auto;
  width: 70%;
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
  const [validPd, setValidPd] = useState<number>(0);

  const reg =
    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|~\-=`{}\[\]:";'<>?,./])[a-zA-Z0-9!@#$%^&*()_+|~\-=`{}\[\]:";'<>?,./]{8,20}$/;

  const handlePdCheck1 = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setPdCheck1(e.target.value);
  };
  const handlePdCheck2 = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setPdCheck2(e.target.value);
  };

  useEffect(() => {
    if (!pdCheck1 && !pdCheck2) {
      setValidPd(() => 0);
    } else if (pdCheck1 === pdCheck2 && reg.test(pdCheck1)) {
      setValidPd(() => 1);
      setPd(() => pdCheck1);
    } else {
      setValidPd(() => 2);
    }
  }, [pdCheck2, pdCheck1]);

  return (
    <div css={container}>
      <div css={{ display: "flex", justifyContent: "space-between" }}>
        <div className="pdHeader">Password </div>
        {validPd == 1 ? <GoCheck color="#ffabab" /> : null}
      </div>
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
      <div css={{}}>{validPd === 2 ? "비밀번호를 확인해 주세요" : ""}</div>
    </div>
  );
}
