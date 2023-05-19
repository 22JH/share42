/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import { useApi } from "../../hooks/useApi";
import TextField from "@mui/material/TextField";
import Btn from "../UI/Btn";
import { useState } from "react";
import { GoCheck } from "react-icons/go";
import { useEffect } from "react";

const SEND_URL = "https://www.share42-together.com/api/join/sms-send";
const CONFIG_URL = "https://www.share42-together.com/api/join/sms-auth";

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

  // 0 : 초기, 1 : 성공 , 2: 실패
  const [numCheck, setNumCheck] = useState<number>(0);
  const [configClick, setConfigClick] = useState<boolean>(false);
  const sendOptions = {
    data: { phoneNumber },
  };

  const configOptions = {
    data: { phoneNumber, authNumber: configNum },
  };

  const sendSMS = useApi("post", SEND_URL, sendOptions);
  const postConfigNum = useApi("post", CONFIG_URL, configOptions);

  const handleSendSMSBtn = () => {
    sendSMS();
    setConfigClick((prev) => true);
  };

  const handleConfigBtn = () => {
    setConfigClick((prev) => false);
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
  };

  useEffect(() => {
    if (configNum !== undefined) {
      postConfigNum()
        .then((res) => {
          if (res.data.message) {
            setNumCheck(() => 1);
          } else {
            setNumCheck(() => 2);
          }
        })
        .catch((err) => {
          setNumCheck(() => 2);
        });
    }
  }, [configNum]);
  return (
    <div css={container}>
      <div css={{ display: "flex", justifyContent: "space-between" }}>
        <div className="phHeader">Phone</div>
        {numCheck === 1 ? <GoCheck color="#ffabab" /> : null}
      </div>
      <div className="phoneSection">
        <TextField
          size="small"
          onBlur={handlePhoneNumber}
          placeholder="전화번호를 입력해주세요"
          disabled={configClick}
        />
        {!configClick ? (
          <Btn
            width={"60px"}
            height={"auto"}
            backGroundColor={"#ffabab"}
            color={"white"}
            border={"0"}
            content={"인증"}
            marginLeft={10}
            onClick={handleSendSMSBtn}
          />
        ) : (
          <Btn
            width={"60px"}
            height={"auto"}
            backGroundColor={"white"}
            color={"#ffabab"}
            border={"1px solid #ffabab"}
            content={"재인증"}
            marginLeft={10}
            onClick={handleConfigBtn}
          />
        )}
      </div>
      {/* 인증번호 입력 창 */}
      <TextField
        disabled={numCheck == 1 || !configClick ? true : false}
        size="small"
        onBlur={handleConfigNumber}
        placeholder="인증번호를 입력해주세요"
      />
      <div>{numCheck == 2 ? "인증번호가 올바르지 않습니다" : null}</div>
    </div>
  );
}
