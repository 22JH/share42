/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { BsMap } from "react-icons/bs";
import { MdDevices } from "react-icons/md";
import { RiAlarmWarningLine, RiFileListLine } from "react-icons/ri";

const container = css`
  width: 100%;
  height: auto;
  .item-container {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 30%;
    height: 17vh;
    background-color: #fef2f458;
    border-radius: 30px;
    color: #000000;
    font-weight: 900;
    font-size: 0.9rem;
  }
  .item:nth-of-type(2n) {
    margin: 0 8% 2% 0;
  }
  .item:nth-of-type(2n + 1) {
    margin: 0 2% 0 8%;
  }
`;

const adminIcons = [
  { title: "신고내역", Icon: RiAlarmWarningLine, url: "/admin/report" },
  { title: "로그조회", Icon: RiFileListLine, url: "/admin/log" },
  { title: "기기조작", Icon: MdDevices, url: "/admin/operation" },
  { title: "맵", Icon: BsMap, url: "/admin/map" },
];

function AdminHomeMenuBtn() {
  const navigate = useNavigate();

  return (
    <div css={container}>
      <div className="item-container">
        {adminIcons.map((icon, index) => {
          const { title, Icon, url } = icon;
          return (
            <div
              key={`${index}/${title}/${url}`}
              className="item"
              onClick={() => navigate(`${url}`)}
            >
              <Icon size={35} style={{ color: "#ff4f4f" }} />
              <p onClick={() => navigate(`${url}`)}>{title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminHomeMenuBtn;
