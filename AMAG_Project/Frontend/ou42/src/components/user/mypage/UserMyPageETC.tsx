/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { BsPersonVcard } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { contentStyle } from "./UserMyPageStyle";
import { useNavigate } from "react-router-dom";

function UserMyPageETC() {
  const navigate = useNavigate();

  const contents = [
    {
      title: "회원 정보 수정",
      Icon: BsPersonVcard,
      url: "/user/mypage/modify",
    },
    { title: "신고하기", Icon: RiErrorWarningLine, url: "/user/report" },
  ];
  return (
    <div css={contentStyle(18)}>
      <p className="main">기타</p>
      {contents.map((content, index) => {
        const { title, Icon, url } = content;
        return (
          <div
            key={`${index}/${title}/${Icon}`}
            className="content"
            onClick={() => navigate(`${url}`)}
          >
            <Icon size={25} className="icon" />
            <p className="title">{title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default UserMyPageETC;
