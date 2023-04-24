/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const titleStyle = css`
  .title {
    display: flex;
    align-items: center;
    margin: 5% 0 5% 4%;
    font-weight: 900;
  }

  hr {
    border: #dddddd 1px solid;
  }
`;

function AdminNav() {
  const navigate = useNavigate();
  const pageName = location.pathname;

  return (
    <div css={titleStyle}>
      <div className="title">
        <MdArrowBackIosNew
          size={25}
          style={{ marginRight: "3%" }}
          onClick={() => navigate("/admin/home")}
        />
        <span>{pageName === "/admin/log" ? "로그조회" : "기기조작"}</span>
      </div>

      <hr />
    </div>
  );
}

export default AdminNav;
