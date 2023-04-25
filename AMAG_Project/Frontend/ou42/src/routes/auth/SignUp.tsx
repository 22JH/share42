/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import IdCheck from "../../components/auth/IdCheck";
import PasswordCheck from "../../components/auth/PasswordCheck";
import Name from "../../components/auth/Name";
import PhoneNumber from "../../components/auth/PhoneNumber";
import Birth from "../../components/auth/Birth";
import Address from "../../components/auth/Address";
import Btn from "../../components/UI/Btn";

const container = css`
  margin-top: 100px;
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .header {
    font-size: 3.2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .btnSection {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 4vh;
    margin-top: 10px;
    margin-bottom: 50px;
  }
`;

export default function SignUp() {
  const [id, setId] = useState<string>("");
  const [pd, setPd] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [si, setSi] = useState<string>("");
  const [goon, setGoon] = useState<string>("");
  const [dong, setDong] = useState<string>("");

  return (
    <div css={container}>
      <div className="header">공유 사이</div>
      <IdCheck setId={setId} />
      <PasswordCheck setPd={setPd} />
      <Name setName={setName} setNickName={setNickName} />
      <PhoneNumber setPhoneNumber={setPhoneNumber} />
      <Birth setBirth={setBirth} />
      <Address setSi={setSi} setGoon={setGoon} setDong={setDong} />
      <div className="btnSection">
        <Btn width={20} height={100} content={"회원가입"} />
      </div>
    </div>
  );
}
