/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface PropType {
  profile: string;
  nickName: string;
  lastChat: string;
  chatNumber: string;
}

const container = css`
  width: 100%;
  height: 10vh;
  border-bottom: 1px solid black;
  display: flex;
  .imgSection {
    flex: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
    .imgBox {
      width: 60%;
      height: 60%;
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
      flex: 1;
      color: #a8a8a8;
    }
  }
  .countSection {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .numberBox {
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      color: white;
      background-color: tomato;
    }
  }
`;

export default function ChatListDetail({ data }: any) {
  return (
    <div css={container}>
      <div className="imgSection">
        <div className="imgBox">
          <img src={data.profile} alt="profile" className="profile" />
        </div>
      </div>
      <div className="contentSection">
        <div className="nickName">{data.nickName}</div>
        <div className="content">{data.lastChat}</div>
      </div>
      <div className="countSection">
        {data.chatNumber !== "0" ? (
          <div className="numberBox">{data.chatNumber}</div>
        ) : null}
      </div>
    </div>
  );
}
