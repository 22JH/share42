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
import logo from "../../assets/mainLogo.png";

const logoSection = css`
  position: relative;
  width: 80%;
  margin-left: 10vw;
  .logoStyle {
    width: auto;
    height: 10vh;
  }
  margin-bottom: 10px;
`;

const container = css`
  /* margin-top: 100px; */
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .line {
    width: 80%;
    height: 1px;
    background-color: #42c2ff;
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
  const [si, setSi] = useState<string>("서울특별시");
  const [goon, setGoon] = useState<string>("강남구");
  const [dong, setDong] = useState<string>("");
  const [addrDetail, setAddrDetail] = useState<string>("");

  // const URL = `https://carborn.site/api/user/community/list/${page}/10/0`;
  // axios header 옵션
  // const ObjString: any = localStorage.getItem("login-token");
  // const option = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${JSON.parse(ObjString).value}`,
  //   },
  // };

  // const postSignUp = useApi("get", URL);

  // 회원가입 버튼 클릭시
  const submit = () => {
    console.log(
      id,
      pd,
      name,
      nickName,
      phoneNumber,
      birth,
      si,
      goon,
      dong,
      addrDetail
    );
  };

  return (
    <>
      <div css={logoSection}>
        <img src={logo} alt="logo" className="logoStyle" />
      </div>
      <div css={container}>
        <hr className="line" />
        <IdCheck setId={setId} />
        <PasswordCheck setPd={setPd} />
        <Name setName={setName} setNickName={setNickName} />
        <PhoneNumber setPhoneNumber={setPhoneNumber} />
        <Birth setBirth={setBirth} />
        <Address
          si={si}
          goon={goon}
          setSi={setSi}
          setGoon={setGoon}
          setDong={setDong}
          setAddrDetail={setAddrDetail}
        />
        <div className="btnSection">
          <Btn width={20} height={100} content={"회원가입"} onClick={submit} />
        </div>
      </div>
    </>
  );
}
