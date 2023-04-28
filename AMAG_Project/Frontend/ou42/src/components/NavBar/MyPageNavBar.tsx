/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Outlet } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

const nav = css`
  display: flex;
  justify-content: space-between;
  background-color: #ffabab;
  align-items: center;

  .left-icon {
    width: 100%;
    height: 6vh;
    display: flex;
    align-items: center;
    p {
      font-size: 1.25rem;
      font-weight: 900;
      margin-left: 2%;
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
  const navigate = useNavigate();

  return (
    <>
      <div css={nav}>
        <div className="left-icon">
          <MdArrowBackIosNew size={25} onClick={() => navigate(-1)} />
          <p>마이페이지</p>
        </div>
        {pathname !== "/user/mypage" ? (
          <div>
            <RiErrorWarningLine size={30} style={{ marginTop: "4px" }} />
          </div>
        ) : null}
      </div>
      <Outlet />
    </>
  );
}

export default MyPageNavBar;
