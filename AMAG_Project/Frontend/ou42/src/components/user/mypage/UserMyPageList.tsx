/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import testObject from "../../../assets/testObject.jpg";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";

const container = css`
  width: 100%;
  height: 100%;

  .container {
    border-bottom: solid 1px rgba(7, 6, 6, 0.15);
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 3%;
    padding-bottom: 2%;
    position: relative;

    .img {
      width: 30%;
      img {
        width: 30vw;
        height: 13vh;
        border-radius: 15px;
        margin: 0 0 0 10%;
      }
    }

    .content {
      width: 70%;
      p {
        margin: 0 0 0 10%;
      }
      p:nth-of-type(1) {
        color: rgba(0, 0, 0, 0.5);
        font-size: 0.75rem;
      }
      p:nth-of-type(2) {
        margin-bottom: 5%;
      }
      p:nth-of-type(3) {
        font-weight: 900;
      }
    }

    .icon {
      display: flex;
      position: absolute;
      bottom: 2%;
      right: 5%;
      .eye {
        display: flex;
        align-items: center;
        p {
          margin: 0;
        }
        margin-right: 15%;
      }
      .heart {
        display: flex;
        align-items: center;
        p {
          margin: 0;
        }
      }
    }
  }
`;

function UserMyPageList() {
  return (
    <div css={container}>
      <div className="container">
        <div className="img">
          <img src={testObject} alt="사진" />
        </div>
        <div className="content">
          <p>ssafy123</p>
          <p>드라이버 공유합니다</p>
          <p>사용 중</p>
        </div>

        <div className="icon">
          <div className="eye">
            <AiOutlineEye />
            <p>30</p>
          </div>
          <div className="heart">
            <AiOutlineHeart />
            <p>12</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserMyPageList;
