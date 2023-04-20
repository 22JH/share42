/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import testObject from "../../assets/testObject.jpg";

import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";
import { useState } from "react";

const content = css`
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    flex: 1 1 35%;
    height: 30vh;
    position: relative;

    .img-icon {
      position: absolute;
      right: 5%;
      bottom: 17%;
    }

    &:nth-of-type(2n + 1) {
      margin: 6% 2% 8% 4%;
    }

    &:nth-of-type(2n) {
      margin: 6% 4% 8% 2%;
    }

    .img {
      width: 100%;
      height: 85%;
      margin-bottom: 3%;
      border-radius: 25px;
    }

    & p {
      margin: 0 0 0 2%;
      color: #a3a3a3;
    }

    & p:nth-of-type(1) {
      font-size: 1rem;
      font-weight: 600;
      color: black;
      margin-bottom: 2%;
    }

    & p:nth-of-type(2) {
      font-weight: 500;
      font-size: 0.7rem;
      color: black;
      margin-bottom: 2%;
    }

    & p:nth-of-type(3) {
      font-size: 0.625rem;
    }

    .icon {
      text-align: end;
      display: flex;
      justify-content: end;

      .eye {
        fill: black;
        display: flex;
        align-items: center;
        & > span {
          font-size: 0.75rem;
        }

        margin-right: 5%;
      }

      .heart {
        fill: black;
        display: flex;
        align-items: center;
        & > span {
          font-size: 0.75rem;
        }
      }
    }

    .img-icon {
      transition: all 2s;
    }
  }
`;

const sampleData = [1, 2, 3, 4, 5, 6, 7, 8];

function UserHome() {
  const [isLike, setIslike] = useState<boolean>(false);

  const like = () => {
    setIslike(!isLike);
  };

  return (
    <div css={content}>
      <div className="container">
        {sampleData.map((data, index) => {
          return (
            <div className="item" key={index}>
              {isLike ? (
                <div className="img-icon" onClick={like}>
                  <AiTwotoneHeart style={{ fill: "red" }} size="23" />
                </div>
              ) : (
                <div className="img-icon" onClick={like}>
                  <AiOutlineHeart style={{ fill: "white" }} size="23" />
                </div>
              )}
              <img src={testObject} alt="test" className="img" />

              <p>5,000,000원</p>
              <p>드라이버 공유합니다.</p>
              <p>서울 · 2분전</p>

              <div className="icon">
                <span className="eye">
                  <AiOutlineEye />
                  <span>12</span>
                </span>

                <div className="heart">
                  <AiOutlineHeart />
                  <span>12</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default UserHome;
