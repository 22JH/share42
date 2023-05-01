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
import logo from "../../assets/logo.png";
import { useApi } from "../../hooks/useApi";
import Alert from "../../components/UI/Alert";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

const URL = `http://k8d102.p.ssafy.io:8088/api/join`;

const logoSection = css`
  position: relative;
  width: 80%;
  margin-left: 10vw;
  height: 170px;
  .logoStyle {
    width: auto;
    height: 220px;
  }
`;

const container = css`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .line {
    width: 80%;
    height: 1px;
    background-color: #d14d72;
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

  const navigate = useNavigate();

  const options = {
    data: {
      userId: id,
      password: pd,
      name: name,
      nickname: nickName,
      phoneNumber: phoneNumber,
      birth: birth,
      sido: si,
      sigungu: goon,
      dong: dong,
      address: addrDetail,
    },
  };
  const submitSignUp = useApi("post", URL, options);
  // 회원가입 버튼 클릭시
  const submit = () => {
    console.log(
      "id",
      id,
      "pd",
      pd,
      "name",
      name,
      "nickName",
      nickName,
      "phoneNumber",
      phoneNumber,
      "birth",
      birth,
      "si",
      si,
      "goon",
      goon,
      "dong",
      dong,
      "addrDetail",
      dong
    );
    if (
      id &&
      pd &&
      name &&
      nickName &&
      phoneNumber &&
      birth &&
      si &&
      goon &&
      dong &&
      addrDetail
    ) {
      submitSignUp()
        .then((res) => {
          Alert("success", "회원가입이 완료되었습니다", () =>
            navigate("/home")
          );
        })
        .catch((err) => Alert("error", err.response.data.message));
    } else {
      Alert("error", "모든 항목을 올바르게 채워 주세요");
    }
  };

  // const submitSignUp = useApi("post");
  return (
    <>
      <div css={logoSection}>
        <img src={logo} alt="logo" className="logoStyle" />
      </div>
      <div css={container}>
        <hr className="line" />
        <IdCheck setId={setId} id={id} />
        <PasswordCheck setPd={setPd} />
        <Name setName={setName} setNickName={setNickName} />
        <PhoneNumber
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
        />
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
          <Btn
            width={"100px"}
            height={"40px"}
            content={"회원가입"}
            onClick={submit}
            backGroundColor={"#ffabab"}
            color={"white"}
            border={"0"}
            marginTop={10}
          />
        </div>
      </div>
    </>
  );
}
