/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BottomMenuBar from "../../components/BottomMenuBar";
import profile from "../../assets/testObject.jpg";
import ChatListDetail from "../../components/user/chat/ChatListDetail";
import { useApi } from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../..";

const URL = "";

const container = css`
  width: 100%;
  height: auto;
`;

interface PropType {
  profile: string;
  nickName: string;
  lastChat: string;
  chatNumber: string;
}

export default function UserChatList() {
  const [chats, setChats] = useState<any>([]);

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

  const getUsers = useApi("get", URL);
  return (
    <div css={container}>
      {Object.entries(chats)
        ?.sort((a: any, b: any) => b[1].date - a[1].date)
        .map((chat, idx) => (
          <ChatListDetail data={chat} key={idx} />
        ))}
      <BottomMenuBar />
    </div>
  );
}
