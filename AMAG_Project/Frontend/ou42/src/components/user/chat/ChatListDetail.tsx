/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useApi } from "./../../../hooks/useApi";

interface PropType {
  profile: string;
  nickName: string;
  lastChat: string;
  chatNumber: string;
}

const container = css`
  width: 100%;
  height: 11vh;
  border-bottom: 1px solid black;
  display: flex;
  .imgSection {
    flex: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
    .imgBox {
      width: 7vh;
      height: 7vh;
      border-radius: 70%;
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, 0.5);
      margin: 0 10px;
      .profile {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .contentSection {
    flex: 4;
    display: flex;
    flex-direction: column;
    .nickName {
      flex: 1;
      display: flex;
      align-items: end;
      font-weight: bold;
    }
    .content {
      padding-top: 10px;
      flex: 1.5;
      color: #a8a8a8;
    }
  }
  .countSection {
    flex: 0.5;
  }
`;

export default function ChatListDetail({ data }: any) {
  const navigate = useNavigate();
  const [otherUserProfile, setOtherUserProfile] = useState<any>();
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;

  // const URL = `https://www.share42-together.com/api/user/info/chat/user-img/${data[1]?.userInfo?.id}`;
  const URL = `https://www.share42-together.com/api/user/info/chat/user-img/${data[1]?.userInfo?.id}`;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getUserProfile = useApi("get", URL, options);

  useQuery(["getUserProfile", data[1]?.userInfo?.id], getUserProfile, {
    select: (res) => res.data.message,
    onSuccess: (res) => setOtherUserProfile(res),
    suspense: false,
  });
  return (
    <div
      css={container}
      onClick={() =>
        navigate(`/user/chat/${data[0]}`, { state: data[1].userInfo.id })
      }
    >
      <div className="imgSection">
        <div className="imgBox">
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}${otherUserProfile}`}
            alt="profile"
            className="profile"
          />
        </div>
      </div>
      <div className="contentSection">
        <div className="nickName">{data[1]?.userInfo?.id}</div>
        {/* <div className="content">{data.lastChat}</div> */}
        <div className="content">{data[1]?.lastMessage?.msg}</div>
      </div>
      <div className="countSection"></div>
    </div>
  );
}
