/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import testObject from "../../../assets/testObject.jpg";
import { profileStyle } from "./UserMyPageStyle";
import { CgProfile } from "react-icons/cg";
import { useApi } from "./../../../hooks/useApi";
import { useGetUserToken } from "../../../hooks/useGetToken";
import { useNavigate } from "react-router-dom";

const URL = "http://k8d102.p.ssafy.io:8088/api/logout";

function UserMyPageProfile() {
  const navigate = useNavigate();

  const options = {
    headers: {
      Authorization: `Bearer ${useGetUserToken()}`,
    },
  };
  const logOut = useApi("get", URL, options);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("loginInfo");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div css={profileStyle}>
        <div className="user-info">
          {/* <img src={testObject} alt="프로필" /> */}
          <CgProfile size={35} style={{ marginRight: "5%" }} />
          <p>지나가는 아보카도</p>
        </div>
        <button onClick={handleLogOut}>로그아웃</button>
      </div>
    </>
  );
}

export default UserMyPageProfile;
