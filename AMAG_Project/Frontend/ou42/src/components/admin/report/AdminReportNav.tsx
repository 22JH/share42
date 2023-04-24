/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { MdArrowBackIosNew } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const titleStyle = (contentName: string) => css`
  .title {
    display: flex;
    align-items: center;
    margin: 5% 0 15% 4%;
    font-weight: 900;
  }

  .content {
    list-style: none;
    display: flex;
    flex-direction: row;
    padding: 0;
    li {
      flex: 1;
      text-align: center;
      border-bottom: 1px solid #dddddd;
      height: 3.5vh;
      color: #a8a8a8;
    }
    li:nth-of-type(
        ${contentName.includes("파손")
            ? 1
            : contentName.includes("분실")
            ? 2
            : 3}
      ) {
      color: black;
      font-weight: 900;
      border-bottom: 2px solid black;
    }
  }
`;

function AdminReportNav() {
  const [contentName, setContentName] = useState<string>("파손");
  const navigate = useNavigate();

  const viewContent = (e: React.TouchEvent<HTMLUListElement>) => {
    e.isPropagationStopped();
    const value = (e?.target as HTMLElement).textContent;
    if (value) {
      setContentName(value);
    }
  };

  return (
    <div css={titleStyle(contentName)}>
      <div className="title">
        <MdArrowBackIosNew
          size={25}
          style={{ marginRight: "3%" }}
          onClick={() => navigate("/admin/home")}
        />
        <span>신고내역</span>
      </div>

      <ul className="content" onTouchStart={viewContent}>
        <li>파손(2)</li>
        <li>분실</li>
        <li>고장</li>
      </ul>
    </div>
  );
}

export default AdminReportNav;
