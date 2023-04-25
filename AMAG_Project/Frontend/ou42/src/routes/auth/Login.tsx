/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Btn from "../../components/UI/Btn";
import { useNavigate } from "react-router-dom";

const container = css`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .loginWindow {
    width: 80%;
    height: 30%;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    border: 1px solid black;
  }
  .userOrAdmin {
    flex: 1;
    display: flex;
    background-color: gray;
    border-top-left-radius: 15px 15px;
    border-top-right-radius: 15px 15px;

    .typeBtn {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .user {
      flex: 1;
      border-bottom: 1px solid black;
      border-top-left-radius: 15px 15px;
    }

    .userActive {
      flex: 1;
      border-right: 2px solid black;
      border-top-left-radius: 15px 15px;
      border-top-right-radius: 15px 15px;
      background-color: white;
    }

    .admin {
      flex: 1;
      border-bottom: 1px solid black;
      border-top-right-radius: 15px 15px;
    }

    .adminActive {
      flex: 1;
      border-left: 2px solid black;
      border-top-left-radius: 15px 15px;
      border-top-right-radius: 15px 15px;
      background-color: white;
    }
  }

  .textWindow {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .txt {
      margin-bottom: 10px;
    }
  }
`;

export default function Login() {
  const [userType, setUserType] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleUserType = () => {
    setUserType(true);
  };
  const handleAdminType = () => {
    setUserType(false);
  };
  return (
    <div css={container}>
      <div className="header">공유사이</div>
      <div className="loginWindow">
        <div className="userOrAdmin">
          <div
            className={userType ? "userActive typeBtn" : "user typeBtn"}
            onClick={handleUserType}
          >
            <p>유저 로그인</p>
          </div>
          <div
            className={userType ? "admin typeBtn" : "adminActive typeBtn"}
            onClick={handleAdminType}
          >
            <p>관리자 로그인</p>
          </div>
        </div>
        <div className="textWindow">
          <div className="idTxt txt">
            <TextField
              id="outlined-basic"
              placeholder="아이디"
              sx={{ width: "300px" }}
              size="small"
            />
          </div>
          <div className="pwdTxt txt">
            <TextField
              id="outlined-basic"
              placeholder="비밀번호"
              sx={{ width: "300px" }}
              size="small"
            />
          </div>
          <Btn width={"90"} height={"15"} color={"white"} content={"a"} />
        </div>
      </div>
      <div className="singupBtn" onClick={() => navigate("/terms")}>
        회원가입
      </div>
    </div>
  );
}
