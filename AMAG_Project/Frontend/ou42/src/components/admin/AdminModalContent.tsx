/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { IoIosCloseCircleOutline } from "react-icons/io";

import testObject from "../../assets/testObject.jpg";
import { Page } from "./report/AdminReportContent";

const container = css`
  width: 70vw;
  height: 53vh;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .icon {
    position: absolute;
    right: 5%;
    /* color: #ff4f4f; */
    color: #d81b60;
  }

  .img {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 70vw;
      height: 30vh;
      border-radius: 10px;
      margin-top: 14%;
    }
  }

  .title {
    p:nth-of-type(1) {
      font-size: 1.4rem;
      margin-bottom: 0;
      font-weight: 900;
      margin-top: 5%;
      color: #d81b60;
    }
    p:nth-of-type(2) {
      margin-top: 1%;
      font-size: 0.7rem;
      margin-bottom: 2%;
      margin-left: 1%;
      color: #555555;
    }
    p:nth-of-type(3) {
      margin-top: 1%;
      font-size: 0.7rem;
      margin-bottom: 5%;
      margin-left: 1%;
      color: #a8a8a8;
    }
  }

  hr {
    border: 1px #e4e4e4af solid;
  }

  .content {
    p:nth-of-type(1) {
      margin-top: 5%;
      margin-bottom: 2%;
      font-size: 0.7rem;
      color: #a8a8a8;
      margin-left: 1%;
    }
    p:nth-of-type(2) {
      margin-top: 2%;
      font-size: 0.9rem;
      color: #000000;
      margin-left: 1%;
    }
  }
`;

function AdminModalContent({
  dialogRef,
  data,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>;
  data: Page;
}) {
  const {
    accountNickname: nickName,
    content,
    lockerLockerStationDong: dong,
    lockerLockerStationSido: sido,
    lockerLockerStationSigungu: sigugun,
    regDt: date,
    title,
  } = data;

  const [DATE, time] = date.split("T");

  return (
    <div css={container}>
      {/* x 아이콘 */}
      <div className="icon">
        <IoIosCloseCircleOutline
          size={27}
          onClick={() => dialogRef.current?.close()}
        />
      </div>

      {/* 사진 */}
      <div className="img">
        <img src={testObject} alt="이미지" />
      </div>

      {/* 내용 */}
      <div className="box">
        <div className="title">
          <p>{title}</p>
          <p>{nickName}</p>
          <p>{`${DATE} · ${time}`}</p>
        </div>
        <hr />
        <div className="content">
          <p>{`${sigugun} ${sido} ${dong} `}</p>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminModalContent;
