/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { BsBox2Heart, BsCalendarHeart, BsHeart } from "react-icons/bs";
import { contentStyle } from "./UserMyPageStyle";

function UserMyPageMyTrade() {
  const contents = [
    { title: "사용 내역", Icon: BsBox2Heart },
    { title: "공유 이력", Icon: BsCalendarHeart },
    { title: "관심 목록", Icon: BsHeart },
  ];
  return (
    <div css={contentStyle(27)}>
      <p>나의 거래</p>

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

export default UserMyPageMyTrade;
