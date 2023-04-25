/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import IdCheck from "../../components/auth/IdCheck";
import PasswordCheck from "../../components/auth/PasswordCheck";
import Name from "../../components/auth/Name";
import PhoneNumber from "../../components/auth/PhoneNumber";
import Birth from "../../components/auth/Birth";
import Address from "../../components/auth/Address";
import { useState } from "react";

export interface addrType {
  si: string;
  dong: string;
  gu: string;
  detail: string;
}

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
`;

export default function SignUp() {
  const [id, setId] = useState<string>("");
  const [pd, setPd] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [addr, setAddr] = useState<Partial<addrType>>({
    si: "",
    gu: "",
    dong: "",
    detail: "",
  });

  return (
    <div css={container}>
      <div className="header">공유 사이</div>
      <IdCheck setId={setId} />
      <PasswordCheck setPd={setPd} />
      <Name setName={setName} />
      <PhoneNumber setPhoneNumber={setPhoneNumber} />
      <Birth setBirth={setBirth} />
      <Address setAddr={setAddr} />
    </div>
  );
}
