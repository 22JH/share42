/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { BsBox2Heart, BsCalendarHeart, BsHeart } from "react-icons/bs";
import { AiOutlineBarChart } from "react-icons/ai";
import { contentStyle } from "./UserMyPageStyle";
import { useNavigate } from "react-router-dom";

const contents = [
  { title: "사용 내역", Icon: BsBox2Heart, url: "/user/mypage/usage" },
  { title: "공유 이력", Icon: BsCalendarHeart, url: "" },
  { title: "관심 목록", Icon: BsHeart, url: "" },
  { title: "통계", Icon: AiOutlineBarChart, url: "" },
];
function UserMyPageMyTrade() {
  const navigate = useNavigate();

  return (
    <div css={contentStyle(31)}>
      <p className="main">나의 거래</p>

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

export default UserMyPageMyTrade;
