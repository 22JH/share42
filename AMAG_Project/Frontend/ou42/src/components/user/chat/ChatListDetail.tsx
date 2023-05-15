/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../..";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    (async () => {
      const otherUser: any = await getDoc(
        doc(db, "users", data[1]?.userInfo?.id)
      );
      setOtherUserProfile(otherUser.data().profile);
    })();
  }, []);
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
            src={`https://www.share42-together.com/images/${otherUserProfile}`}
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
