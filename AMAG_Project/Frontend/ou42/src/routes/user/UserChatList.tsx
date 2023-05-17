/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BottomMenuBar from "../../components/BottomMenuBar";
import ChatListDetail from "../../components/user/chat/ChatListDetail";
import { useApi } from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../..";

const URL = "";

const container = css`
  width: 100%;
  height: auto;
  margin-top: 7vh;
  .noChats {
    width: 100%;
    height: 82vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface PropType {
  profile: string;
  nickName: string;
  lastChat: string;
  chatNumber: string;
}

export default function UserChatList() {
  const [chats, setChats] = useState<any>(null);

  const loginObject = localStorage.getItem("loginInfo");
  const { userId } = loginObject ? JSON.parse(loginObject) : null;

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", userId), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    userId && getChats();
  }, [userId]);
  console.log(chats.length);
  const getUsers = useApi("get", URL);
  return (
    <div css={container}>
      {!chats || chats.length > 0 ? (
        <div className="noChats">채팅 내역이 없습니다.</div>
      ) : (
        Object.entries(chats)
          ?.sort((a: any, b: any) => b[1].date - a[1].date)
          .map((chat, idx) => <ChatListDetail data={chat} key={idx} />)
      )}
      <BottomMenuBar />
    </div>
  );
}
