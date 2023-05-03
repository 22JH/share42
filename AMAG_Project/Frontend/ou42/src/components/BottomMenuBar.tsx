/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { AiOutlineHome } from "react-icons/ai";
import {
  BsChatRightHeart,
  BsFillMenuButtonWideFill,
  BsMap,
} from "react-icons/bs";
import { TbNfc } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { RiAlarmWarningLine, RiFileListLine } from "react-icons/ri";
import { MdDevices } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const bottomMenuBarStyle = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 7%;
  background-color: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 10px 15px black;
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
  const { pathname } = useLocation();

  const homeIcons = [
    { title: "홈", Icon: AiOutlineHome, url: "/home" },
    {
      title: "커뮤니티",
      Icon: BsFillMenuButtonWideFill,
      url: "/user/community",
    },
    { title: "NFC", Icon: TbNfc, url: "/uesr/nfc" },
    { title: "채팅", Icon: BsChatRightHeart, url: "/user/chat" },
    { title: "내 프로필", Icon: RxPerson, url: "/user/mypage" },
  ];

  const adminIcons = [
    { title: "홈", Icon: AiOutlineHome, url: "/admin/home" },
    { title: "신고내역", Icon: RiAlarmWarningLine, url: "/admin/report" },
    { title: "로그조회", Icon: RiFileListLine, url: "/admin/log" },
    { title: "기기조작", Icon: MdDevices, url: "/admin/operation" },
    { title: "맵", Icon: BsMap, url: "/user/map" },
  ];

  console.log(pathname);

  return (
    <div css={bottomMenuBarStyle}>
      {(pathname.includes("admin") ? adminIcons : homeIcons).map(
        (icon, index) => {
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
        }
      )}
    </div>
  );
}

export default BottomMenuBar;
