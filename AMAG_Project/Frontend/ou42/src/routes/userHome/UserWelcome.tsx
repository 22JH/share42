/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const container = css`
  display: flex;
  height: 90vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .logo {
    opacity: 1;
    animation-name: svgAnimation;
    animation-duration: 1.2s;
  }

  @keyframes svgAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .font {
    position: absolute;
    bottom: 8%;
    text-align: center;
    font-size: 0.55rem;
    animation-name: fontAnimation;
    animation-duration: 1.2s;

    span:nth-of-type(1) {
      color: #d14d72;
      font-weight: 900;
    }

    span:nth-of-type(2) {
      color: #acacac;
    }
  }

  @keyframes fontAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

function UserWelcome() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/start");
    }, 1200);
  }, []);

  return (
    <div css={container}>
      <div className="logo">
        <img src={logo} alt="logo" height="250" width="250" />
      </div>
      <div className="font">
        <span>Miracle </span>
        <span>Copyright Miracle Corp. All Rights Reserved</span>
      </div>
    </div>
  );
}

export default UserWelcome;
