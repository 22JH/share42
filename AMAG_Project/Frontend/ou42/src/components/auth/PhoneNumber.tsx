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
  width: 70%;
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
  const handlePhoneNumber = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setPhoneNumber(() => e.target.value);
  };

  return (
    <div css={container}>
      <div className="phHeader">Phone</div>
      <div className="phoneSection">
        <TextField size="small" />
        <Btn
          width={"60px"}
          height={"auto"}
          backGroundColor={"white"}
          content={"인증"}
          marginLeft={10}
        />
      </div>
      {/* 인증번호 입력 창 */}
      <TextField size="small" onBlur={handlePhoneNumber} />
    </div>
  );
}
