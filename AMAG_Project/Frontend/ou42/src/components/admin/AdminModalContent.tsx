/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { IoIosCloseCircleOutline } from "react-icons/io";

import testObject from "../../assets/testObject.jpg";
import { Page } from "./report/AdminReportContent";

const container = css`
  width: 70vw;
  height: 60vh;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  .icon {
    position: absolute;
    right: 5%;
    color: white;
  }

  .img {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 68vw;
      height: 30vh;
      border-radius: 10px;
      margin-top: 13%;
      border: 2px solid white;
    }
  }

  .title {
    p:nth-of-type(1) {
      font-size: 1.4rem;
      margin-bottom: 0;
      font-weight: 900;
      margin-top: 10%;
      color: white;
    }
    p:nth-of-type(2) {
      margin-top: 1%;
      font-size: 0.8rem;
      margin-bottom: 2%;
      color: #a0a0a0;
    }
    p:nth-of-type(3) {
      margin-top: 1%;
      font-size: 0.8rem;
      margin-bottom: 2%;
      color: #a0a0a0;
    }
  }

  hr {
    border: 1px #e4e4e4 solid;
  }

  .content {
    p:nth-of-type(1) {
      margin-top: 2%;
      margin-bottom: 2%;
      font-size: 0.8rem;
      color: #a8a8a8;
    }
    p:nth-of-type(2) {
      margin-top: 2%;
      font-size: 0.9rem;
      color: white;
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
          size={25}
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
