/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import testObject from "../../../assets/testObject.jpg";
import { profileStyle } from "./UserMyPageStyle";

function UserMyPageProfile() {
  return (
    <>
      <div css={profileStyle}>
        <div className="user-info">
          <img src={testObject} alt="프로필" />
          <p>지나가는 아보카도</p>
        </div>
        <button>로그아웃</button>
      </div>
    </>
  );
}

export default UserMyPageProfile;
