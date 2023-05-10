/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BottomMenuBar from "../../components/BottomMenuBar";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import MessageBox from "../../components/user/chat/MessageBox";
import {
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../..";
import { useParams, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";

const container = css`
  width: 100%;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  .chatSection {
    height: 80%;
    width: 100%;
    overflow: scroll;
  }
  .sendMsg {
    display: flex;
    flex-direction: row;
    height: 20%;
    width: 100%;
    justify-content: center;
    .sendField {
      width: 80%;
      margin-right: 10px;
    }
    .sendBtn {
      width: 20%;
      height: auto;
    }
  }
`;

export default function UserChat() {
  const [msg, setMsg] = useState<string>("");
  const [messages, setMessages] = useState([]);

  const { chatName }: any = useParams()!;
  const loginObject = localStorage.getItem("loginInfo")!;
  const { userId } = JSON.parse(loginObject);
  const { state } = useLocation();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatName), (doc: any) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, []);

  const handleMsg = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMsg(e.target.value);
  };

  const handleSend = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") {
      e.preventDefault();
      send();
    }
  };

  const send = async () => {
    await updateDoc(doc(db, "chats", chatName), {
      messages: arrayUnion({
        id: uuid(),
        msg,
        senderId: userId,
        date: Timestamp.now(),
      }),
    });

    setMsg("");

    await updateDoc(doc(db, "userChats", userId), {
      [chatName + ".lastMessage"]: {
        msg,
      },
      [chatName + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", state), {
      [chatName + ".lastMessage"]: {
        msg,
      },
      [chatName + ".date"]: serverTimestamp(),
    });
  };

  return (
    <div css={container}>
      <div className="chatSection">
        <MessageBox data={messages} />
      </div>
      <div className="sendMsg">
        <TextField
          value={msg}
          size="small"
          placeholder="메세지를 입력해 주세요"
          onChange={handleMsg}
          className="sendField"
          onKeyUp={handleSend}
        />
        <RiSendPlaneFill
          onClick={send}
          css={{ width: "10%", height: "23%", color: "tomato" }}
        />
      </div>
      <BottomMenuBar />
    </div>
  );
}
