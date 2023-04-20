/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AiOutlineCheckCircle } from "react-icons/ai";

const container = css`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .header {
    font-size: 3.2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .section {
    position: relative;
    display: flex;
    /* flex-direction: row; */
    width: 90%;
    .checkIcon {
      margin-right: 5px;
    }
    .temrs {
      font-size: 18px;

      /* font-weight: 500; */
    }
  }
`;

const AGREE_ALL: string =
  "이용약관, 개인정보 수집 및 이용, 위치기반서비스 이용약관(모두동의)";

const AGREE_1: string = "이용약관 동의(필수)";
const AGREE_2: string = "개인정보 수집 및 이용 동의(필수)";
const AGREE_3: string = "위치기반서비스 이용약관 동의(선택)";

export default function Temrs() {
  return (
    <div css={container}>
      <div className="header">공유사이</div>
      <div className="section">
        <div className="checkIcon">
          <AiOutlineCheckCircle size={"40px"} css={{ marginRight: "10px" }} />
        </div>
        <div className="temrs">{AGREE_ALL}</div>
      </div>
      <div className="section">
        <div className="checkIcon">
          <AiOutlineCheckCircle size={"40px"} css={{ marginRight: "10px" }} />
        </div>
        <div className="temrs">{AGREE_1}</div>
      </div>
      <div className="section">
        <div className="checkIcon">
          <AiOutlineCheckCircle size={"40px"} css={{ marginRight: "10px" }} />
        </div>
        <div className="temrs">{AGREE_2}</div>
      </div>
      <div className="section">
        <div className="checkIcon">
          <AiOutlineCheckCircle size={"40px"} css={{ marginRight: "10px" }} />
        </div>
        <div className="temrs">{AGREE_3}</div>
      </div>
    </div>
  );
}
