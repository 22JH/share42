/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "react-query";
import adminStore from "../../../store/adminStore";

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
    margin-bottom: 0;
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

function AdminReportNav({ count }: { count: number }) {
  const [contentName, setContentName] = useState<string>("파손");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setCategory } = adminStore();

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

      <ul
        className="content"
        onTouchStart={viewContent}
        onClick={(e: React.MouseEvent<HTMLUListElement>) => {
          setCategory(Number((e.target as HTMLElement).getAttribute("value")));
          queryClient.invalidateQueries(["admin-report"]);
        }}
      >
        <li value={2}>파손{contentName === "파손" ? `${count}` : null}</li>
        <li value={0}>분실{contentName === "분실" ? `${count}` : null}</li>
        <li value={1}>고장{contentName === "고장" ? `${count}` : null}</li>
      </ul>
    </div>
  );
}

export default AdminReportNav;
