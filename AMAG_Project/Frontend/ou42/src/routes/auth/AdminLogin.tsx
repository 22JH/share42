/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Btn from "../../components/UI/Btn";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Circle from "../../components/UI/Circle";
import { useApi } from "./../../hooks/useApi";
import Alert from "../../components/UI/Alert";

const URL = "http://k8d102.p.ssafy.io:8088/api/login";

const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .back {
    flex: 1;
  }
  .logo {
    flex: 5.5;
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

export default function AdminLogin() {
  const [id, setId] = useState<string>("");
  const [pd, setPd] = useState<string>("");

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

  const loginOptions = {
    data: {
      userId: id,
      password: pd,
    },
  };

  const postLogin = useApi("post", URL, loginOptions);

  const handleLogin = () => {
    postLogin()
      .then((res) => {
        const obj: {
          token: string;
          expire: number;
          userId: string;
          type: string;
        } = {
          token: res.data.message.token.accessToken,
          expire: Date.now() + 1800000,
          userId: id,
          type: "admin",
        };
        localStorage.setItem("loginInfo", JSON.stringify(obj));

        navigate("/admin/home");
      })
      .catch((err) => Alert("error", err.response.data.message));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div css={container}>
      <div className="back"></div>
      <div className="logo">
        <img src={logo} alt="logo" height="300" width="300" />
      </div>
      <div className="loginInput" onKeyDown={handleKeyDown}>
        <TextField
          size="small"
          className="textField"
          placeholder="ID"
          onChange={handleId}
          sx={{ zIndex: "2" }}
        />
        <TextField
          size="small"
          className="textField"
          placeholder="PASSWORD"
          onChange={handlePd}
          type="password"
          sx={{ zIndex: "2" }}
        />
      </div>
      <div className="btn">
        <Btn
          width="35%"
          height="15%"
          content="로그인"
          borderR={10}
          marginTop={20}
          boxShadow={"-1px 2px 1px 2px rgba(209, 77, 114, 0.25)"}
          backGroundColor="#FFABAB"
          border={0}
          color={"white"}
          onClick={handleLogin}
        />
        ADMIN
      </div>
      <Circle />
    </div>
  );
}
