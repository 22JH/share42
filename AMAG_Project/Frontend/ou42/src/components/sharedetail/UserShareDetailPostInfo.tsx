/** @jsxImportSource @emotion/react */

import { FaHeart } from "react-icons/fa";
import ProfilePic from "../../assets/ProfilePic.svg";
import { FaHeartStyle } from "./style/UserShareDetailStyle";
import { UserShareDetailPostInfoProps } from "./type/UserShareDetailType";

const UserShareDetailPostInfo = ({
  isLike,
  handleLikeRequest,
}: UserShareDetailPostInfoProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90vw",
        borderBottom: '1px solid #adadad'
      }}
    >
      <div
        style={{
          width: "90vw",
          height: "10vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "50px",
            height: "50px",
          }}
          src={ProfilePic}
          alt="ProfilePic"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "3vw",
          }}
        >
          <span style={{ fontSize: "1.1rem", fontWeight: "900" }}>닉네임</span>
          <span style={{ color: "#ADADAD" }}>공구·인동 9분전</span>
        </div>
      </div>
      <div onClick={handleLikeRequest}>
        <FaHeart
          css={FaHeartStyle}
          className={isLike ? "like" : ""}
          style={{
            color: isLike ? "red" : "#ADADAD",
            fontSize: "45px",
          }}
        />
      </div>
    </div>
  );
};

export default UserShareDetailPostInfo;
