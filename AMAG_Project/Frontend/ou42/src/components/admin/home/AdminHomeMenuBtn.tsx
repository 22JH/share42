/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import caution from "../../../assets/caution.svg";
import logFile from "../../../assets/logFile.svg";
import manufacturing from "../../../assets/manufacturing.svg";
import map from "../../../assets/map.svg";

const container = css`
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
    background-color: rgba(245, 247, 254, 0.71);
    border-radius: 30px;
    color: #5f6065;
    font-weight: 900;
  }
  .item:nth-of-type(2n) {
    margin: 0 8% 2% 0;
  }
  .item:nth-of-type(2n + 1) {
    margin: 0 2% 0 8%;
  }
`;

const MENU_NUM = [
  ["신고내역", caution, "/admin/report"],
  ["로그조회", logFile, "/admin/log"],
  ["기기조작", manufacturing, "/admin/operation"],
  ["지도", map, "/admin/report"],
];

function AdminHomeMenuBtn() {
  const navigate = useNavigate();

  return (
    <div css={container}>
      <div className="item-container">
        {MENU_NUM.map((item, index) => {
          return (
            <div
              key={`${index}/${item[1]}/${item[0]}`}
              className="item"
              onClick={() => navigate(`${item[2]}`)}
            >
              {/* <object
                data={item[1]}
                type="image/svg+xml"
                style={{ marginTop: "13%" }}
              ></object> */}
              <img
                src={item[1]}
                style={{ marginTop: "13%" }}
                onClick={() => navigate(`${item[2]}`)}
              />

              <p onClick={() => navigate(`${item[2]}`)}>{item[0]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminHomeMenuBtn;
