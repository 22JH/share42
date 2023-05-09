/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BottomMenuBar from "../../components/BottomMenuBar";
import profile from "../../assets/testObject.jpg";
import ChatListDetail from "../../components/user/chat/ChatListDetail";
import { useApi } from "../../hooks/useApi";

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
const temp = [
  {
    profile,
    nickName: "닉네임1",
    lastChat: "fjfjjfjfjf",
    chatNumber: "3",
  },
  {
    profile,
    nickName: "닉네임2",
    lastChat: "wefe",
    chatNumber: "1",
  },
  {
    profile,
    nickName: "닉네임3",
    lastChat: "123123",
    chatNumber: "0",
  },
  {
    profile,
    nickName: "닉네임4",
    lastChat: "12421423231",
    chatNumber: "2",
  },
];

export default function UserChatList() {
  const getUsers = useApi("get", URL);
  return (
    <div css={container}>
      {temp?.map((ele: PropType, idx: number) => (
        <ChatListDetail data={ele} key={idx} />
      ))}
      <BottomMenuBar />
    </div>
  );
}
