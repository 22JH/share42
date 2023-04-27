/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Btn from "../../components/UI/Btn";
import logo from "../../assets/logo.png";
import { GoCheck } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Circle from "../../components/UI/Circle";

const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .back {
    flex: 1;
  }
  .logo {
    flex: 7;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loginInput {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .textField {
      width: 70%;
      .MuiOutlinedInput-root {
        background-color: white;
        border-radius: 15px;
        box-shadow: -1px 2px 1px 2px rgba(209, 77, 114, 0.25);
      }
      &:nth-of-type(1) {
        margin-bottom: 20px;
      }
      &:nth-of-type(2) {
        margin-bottom: 10px;
      }
    }
  }
  .btn {
    flex: 6;
    display: flex;
    align-items: center;
    flex-direction: column;

    .signUp {
      margin-top: 10px;
    }
  }
`;

export default function Login() {
  const [id, setId] = useState<string>("");
  const [pd, setPd] = useState<string>("");
  // flase = 유저, true = 관리자
  const [type, setType] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleId = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const temp = e.target.value;
    setId(() => temp as string);
  };

  const handlePd = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const temp = e.target.value;
    setPd(() => temp as string);
  };

  return (
    <div css={container}>
      <div className="back"></div>
      <div className="logo">
        <img src={logo} alt="logo" height="300" width="300" />
      </div>
      <div className="loginInput">
        <TextField
          size="small"
          className="textField"
          placeholder="ID"
          onBlur={handleId}
          sx={{ zIndex: "2" }}
        />
        <TextField
          size="small"
          className="textField"
          placeholder="PASSWORD"
          onBlur={handlePd}
          type="password"
          sx={{ zIndex: "2" }}
        />
        <div className="changeType" onClick={() => setType((prev) => !prev)}>
          관리자 로그인 {type ? <GoCheck /> : null}
        </div>
      </div>
      <div className="btn">
        <Btn
          width="35%"
          height="15%"
          content="로그인"
          borderR={10}
          marginTop={100}
          boxShadow={"-1px 2px 1px 2px rgba(209, 77, 114, 0.25)"}
          backGroundColor="#FFABAB"
          border={0}
          color={"white"}
        />
        <div className="signUp" onClick={() => navigate("/signup")}>
          회원가입
        </div>
      </div>
      <Circle />
    </div>
  );
}
