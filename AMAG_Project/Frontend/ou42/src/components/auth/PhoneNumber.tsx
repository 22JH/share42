/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Btn from "../UI/Btn";

interface PropType {
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}

const container = css`
  display: flex;
  height: 15vh;
  width: 75%;
  flex-direction: column;
  .phHeader {
    margin-bottom: 5px;
  }
  .phoneSection {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .varify {
    flex: 1;
  }
`;

export default function PhoneNumber({ setPhoneNumber }: PropType) {
  return (
    <div css={container}>
      <div className="phHeader">전화번호</div>
      <div className="phoneSection">
        <TextField size="small" />
        <Btn width={25} height={100} color={"white"} content={"인증"} />
      </div>
      {/* 인증번호 입력 창 */}
      <TextField size="small" />
    </div>
  );
}
