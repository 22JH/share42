/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const container = css`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  position: relative;

  .logo {
    position: fixed;
    top: 15%;
  }

  .font {
    text-align: center;
    bottom: 20%;
    position: absolute;
    top: 38%;

    p:nth-of-type(1) {
      font-weight: 900;
      font-size: 1.3rem;
      margin-bottom: 5%;
    }
    p:nth-of-type(2) {
      margin: 0;
    }
  }

  .btn {
    position: absolute;
    border: 0;
    width: 50%;
    height: 5%;
    border-radius: 10px;
    background-color: #ffabab;
    color: white;
    font-weight: 900;
    font-size: 1rem;
    bottom: 20%;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.54);
  }

  .login {
    position: absolute;
    bottom: 16%;
    display: flex;

    p {
      margin: 0;
      font-size: 0.8rem;
    }

    p:nth-of-type(1) {
      opacity: 0.3;
      margin: 0 10px 0 0;
    }

    p:nth-of-type(2) {
      color: #d14d72;
      font-weight: 900;
    }
  }
`;

function UserBeforeMain() {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/login");
  };

  const goSignUp = () => {
    navigate("/signup");
  };

  return (
    <div css={container}>
      <div className="logo">
        <img src={logo} alt="logo" height="250" width="250" />
      </div>

      <div className="font">
        <p>비대면 물품 공유 플랫폼</p>
        <p>우리서비스는 이런거에요 설명문구 두줄정도!</p>
      </div>

      <button className="btn" onClick={goLogin}>
        시작하기
      </button>

      <div className="login">
        <p>계정이 없으신가요?</p>
        <p onClick={goSignUp}>회원가입</p>
      </div>
    </div>
  );
}

export default UserBeforeMain;
