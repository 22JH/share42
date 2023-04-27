/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { BsPersonVcard } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { contentStyle } from "./UserMyPageStyle";

function UserMyPageETC() {
  const contents = [
    { title: "회원 정보 수정", Icon: BsPersonVcard },
    { title: "신고하기", Icon: RiErrorWarningLine },
  ];
  return (
    <div css={contentStyle(20)}>
      <p className="main">기타</p>
      {contents.map((content, index) => {
        const { title, Icon } = content;
        return (
          <div key={`${index}/${title}/${Icon}`} className="content">
            <Icon size={25} className="icon" />
            <p className="title">{title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default UserMyPageETC;
