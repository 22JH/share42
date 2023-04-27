/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { AiOutlineHome } from "react-icons/ai";
import {
  BsClipboard2Plus,
  BsChatRightHeart,
  BsFillMenuButtonWideFill,
} from "react-icons/bs";
import { TbNfc } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const bottomMenuBarStyle = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 7%;
  background-color: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 0px 10px black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin-bottom: 0;
      margin-top: 4px;
      font-size: 0.8rem;
    }
  }
`;

function BottomMenuBar() {
  const navigate = useNavigate();
  const icons = [
    { title: "홈", Icon: AiOutlineHome, url: "/home" },
    { title: "커뮤니티", Icon: BsFillMenuButtonWideFill, url: "/community" },
    { title: "NFC", Icon: TbNfc, url: "" },
    { title: "채팅", Icon: BsChatRightHeart, url: "/chat" },
    { title: "내 프로필", Icon: RxPerson, url: "/user/mypage" },
  ];
  return (
    <div css={bottomMenuBarStyle}>
      {icons.map((icon, index) => {
        const { title, Icon, url } = icon;
        return (
          <div
            key={`${index}/${url}/${title}`}
            className="btn"
            onClick={() => navigate(`${url}`)}
          >
            <Icon />
            <p>{title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default BottomMenuBar;
