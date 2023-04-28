/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import testObject from "../../../assets/testObject.jpg";
import { profileStyle } from "./UserMyPageStyle";
import { CgProfile } from "react-icons/cg";

function UserMyPageProfile() {
  return (
    <>
      <div css={profileStyle}>
        <div className="user-info">
          {/* <img src={testObject} alt="프로필" /> */}
          <CgProfile size={35} style={{ marginRight: "5%" }} />
          <p>지나가는 아보카도</p>
        </div>
        <button>로그아웃</button>
      </div>
    </>
  );
}

export default UserMyPageProfile;
