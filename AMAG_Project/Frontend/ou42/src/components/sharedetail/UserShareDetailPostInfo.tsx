/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */

import axios from "axios";
import { async } from "q";
import { FaHeart } from "react-icons/fa";
import { useMutation } from "react-query";
import { useParams } from "react-router";
import ProfilePic from "../../assets/ProfilePic.svg";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { FaHeartStyle } from "./style/UserShareDetailStyle";
import { UserShareDetailPostInfoProps } from "./type/UserShareDetailType";

const UserShareDetailPostInfo = ({
  isLike,
  handleLikeRequest,
  handleLikeCancel,
  data,
}: UserShareDetailPostInfoProps) => {
  const { id } = useParams();
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;

  const { mutate: likeAdd } = useMutation(["setLikeAdd", id], async () => {
    try {
      const res = await axios({
        method: "POST",
        url: `http://www.share42-together.com:8088/api/user/share/share-articles/like/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  });

  const { mutate: likeDelete } = useMutation(["setLikeDelete", id], async () => {
    try {
      const res = await axios({
        method: "POST",
        url: `http://www.share42-together.com:8088/api/user/share/share-articles/unlike/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90vw",
        borderBottom: "1px solid #adadad",
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
          <span style={{ fontSize: "1.1rem", fontWeight: "900" }}>
            {data?.accountNickname}
          </span>
          <span style={{ color: "#ADADAD" }}>
            {data?.category} · {data?.accountSigungu} {data?.accountDong}{" "}
            {getTimeAgo(data?.uptDt)}
          </span>
        </div>
      </div>
      <div
        onClick={isLike === false ? async () => {
          await likeAdd();
          await handleLikeRequest();
        } : 
        async () => {
          await likeDelete();          
          await handleLikeCancel();
        }
      }
      >
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
