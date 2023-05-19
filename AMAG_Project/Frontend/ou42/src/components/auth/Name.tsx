/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { GoCheck } from "react-icons/go";
import TextField from "@mui/material/TextField";

interface PropType {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setNickName: React.Dispatch<React.SetStateAction<string>>;
}

const container = css`
  display: flex;
  height: auto;
  width: 70%;
  flex-direction: column;
  .nameHeader {
    margin-bottom: 5px;
  }
`;

export default function Name({ setName, setNickName }: PropType) {
  // 0은 초기상태, 1은 통과, 2는 다시
  const [validId, setValidId] = useState<number>(0);
  const [validNick, setValidNick] = useState<number>(0);

  const reg = /^[가-힣]{1,4}$/;
  const nickReg = /^[a-zA-Z0-9가-힣]{1,20}$/;
  const nameHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (reg.test(e?.target?.value)) {
      setName(e?.target?.value);
      setValidId(() => 1);
    } else if (e?.target?.value) {
      setValidId(() => 2);
      setName("");
    }
  };

  const nickNameHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (nickReg.test(e?.target?.value)) {
      setNickName(e?.target?.value);
      setValidNick(() => 1);
    } else if (e?.target?.value) {
      setValidNick(() => 2);
      setNickName("");
    }
  };

  return (
    <div css={container}>
      <div css={{ display: "flex", justifyContent: "space-between" }}>
        <div className="nameHeader">Name</div>
        {validId == 1 ? <GoCheck color="#ffabab" /> : null}
      </div>
      <TextField
        size="small"
        css={{ marginBottom: "10px" }}
        placeholder="이름을 입력해주세요"
        onBlur={nameHandler}
      />
      <div css={{ marginBottom: "10px" }}>
        {validId == 2 ? "이름을 네글자 미만 한글로 입력해 주세요" : null}
      </div>
      <div css={{ display: "flex", justifyContent: "space-between" }}>
        <div className="nameHeader">Nickname</div>
        {validNick == 1 ? <GoCheck color="#ffabab" /> : null}
      </div>
      <TextField
        size="small"
        css={{ marginBottom: "15px" }}
        placeholder="별명을 입력해주세요"
        onBlur={nickNameHandler}
      />
      <div css={{ marginBottom: "10px" }}>
        {validNick == 2 ? "별명은 20글자 미만으로 입력해 주세요" : null}
      </div>
    </div>
  );
}
