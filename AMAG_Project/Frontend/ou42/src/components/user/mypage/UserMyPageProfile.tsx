/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { profileStyle } from "./UserMyPageStyle";
import { CgProfile } from "react-icons/cg";
import { useApi } from "./../../../hooks/useApi";
import { useGetUserToken } from "../../../hooks/useGetToken";
import { useNavigate } from "react-router-dom";

const URL = "https://www.share42-together.com/api/logout";
interface Info {
  address: string;
  birth: string;
  dong: string;
  img: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  sido: string;
  sigungu: string;
}

function UserMyPageProfile({ info }: { info?: Info }) {
  const navigate = useNavigate();
  const imgUrl = process.env.REACT_APP_IMAGE_URL;

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
      .catch();
  };
  return (
    <>
      <div css={profileStyle}>
        <div className="user-info">
          {info?.img ? (
            <img src={`${imgUrl}${info?.img}`} alt="프로필" />
          ) : (
            <CgProfile size={35} style={{ marginRight: "5%" }} />
          )}
          <p>{info?.nickname}</p>
        </div>
        <button onClick={handleLogOut}>로그아웃</button>
      </div>
    </>
  );
}

export default UserMyPageProfile;
