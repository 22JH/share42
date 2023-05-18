/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Outlet } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import navStore from "../../store/navStore";

const nav = css`
  display: flex;
  justify-content: space-between;
  background-color: #ffabab;
  align-items: center;
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 99;

  .left-icon {
    width: 100%;
    height: 6vh;
    display: flex;
    align-items: center;
    p {
      font-size: 1.4rem;
      font-weight: 900;
      margin: 2% 0 0 2%;
    }
  }
  div {
    color: white;
  }
  div:nth-of-type(1) {
    margin-left: 3%;
  }

  div:nth-of-type(2) {
    margin-right: 3%;
  }
`;

function MyPageNavBar() {
  const { pathname } = useLocation();
  const { pathTitle } = navStore();
  const navigate = useNavigate();
  
  return (
    <>
      <div css={nav}>
        <div className="left-icon">
          <MdArrowBackIosNew size={25} onClick={() => navigate(-1)} />
          <p>{pathTitle}</p>
        </div>
        {pathname !== "/user/mypage" ? (
          <div onClick={() => navigate("/user/report")}>
            <RiErrorWarningLine size={30} style={{ marginTop: "4px" }} />
          </div>
        ) : null}
      </div>
      <Outlet />
    </>
  );
}

export default MyPageNavBar;
