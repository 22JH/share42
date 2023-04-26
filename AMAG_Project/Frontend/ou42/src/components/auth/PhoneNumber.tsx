/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import { useApi } from "../../hooks/useApi";
import TextField from "@mui/material/TextField";
import Btn from "../UI/Btn";
import { useState } from "react";

// 상우 ip
const SEND_URL = "http://192.168.100.79:8080/api/join/sms-send";
const CONFIG_URL = "http://192.168.100.79:8080/api/join/sms-auth";

interface PropType {
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
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

export default function PhoneNumber({ setPhoneNumber, phoneNumber }: PropType) {
  const [configNum, setConfigNum] = useState<string>();

  const sendOptions = {
    data: { phoneNumber },
    // headers: {
    //   "Content-Type": `application/json`,
    // },
  };

  const configOptions = {
    data: { phoneNumber, authNumber: configNum },
  };

  const sendSMS = useApi("post", SEND_URL, sendOptions);
  const postConfigNum = useApi("post", CONFIG_URL, configOptions);

  const handleSendSMSBtn = () => {
    console.log(phoneNumber);
    sendSMS();
  };

  const handlePhoneNumber = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setPhoneNumber(() => e.target.value);
  };

  const handleConfigNumber = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setConfigNum(() => e?.target?.value);
    postConfigNum().then((res) => console.log(res));
  };

  return (
    <div css={container}>
      <div className="phHeader">Phone</div>
      <div className="phoneSection">
        <TextField size="small" onBlur={handlePhoneNumber} />
        <Btn
          width={"60px"}
          height={"auto"}
          backGroundColor={"white"}
          content={"인증"}
          marginLeft={10}
          onClick={handleSendSMSBtn}
        />
      </div>
      {/* 인증번호 입력 창 */}
      <TextField size="small" onBlur={handleConfigNumber} />
    </div>
  );
}
