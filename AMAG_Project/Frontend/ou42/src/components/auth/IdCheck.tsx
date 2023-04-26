/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { GoCheck } from "react-icons/go";
import Btn from "../UI/Btn";

interface PropType {
  setId: React.Dispatch<React.SetStateAction<string>>;
}

const container = css`
  display: flex;
  height: 6.5vh;
  width: 70%;
  flex-direction: column;
  margin-bottom: 20px;
  .idHeader {
    font-size: 1rem;
    margin-bottom: 5px;
  }

  .idSection {
    display: flex;
    height: 100%;
  }
`;

export default function IdCheck({ setId }: PropType) {
  const [validId, setValidId] = useState<boolean>(false);
  const reg = /^[a-z0-9_]{8,20}$/;

  const idHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (reg.test(e?.target?.value)) {
      setId(e?.target?.value);
    } else {
      console.log("");
    }
  };

  return (
    <div css={container}>
      <div css={{ display: "flex", justifyContent: "space-between" }}>
        <div className="idHeader">ID</div>
        <GoCheck color="#ffabab" />
      </div>
      <div className="idSection">
        <TextField
          size="small"
          onBlur={idHandler}
          placeholder="아이디를 입력해 주세요."
        />
        <Btn width={"50px"} height={"auto"} marginLeft={10} content="check" />
      </div>
    </div>
  );
}
