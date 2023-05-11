/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { IoIosCloseCircleOutline } from "react-icons/io";

import { Data } from "./AdminLogContents";

const container = css`
  width: 70vw;
  height: 55vh;
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
      font-size: 1.2rem;
      margin-bottom: 1%;
      font-weight: 900;
      margin-top: 5%;
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
      margin-bottom: 2%;
      margin-left: 1%;
      color: #a8a8a8;
    }
    p:nth-of-type(4) {
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
      font-weight: 600;
      color: #b2b1b1;
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

function AdminLogModal({
  dialogRef,
  data,
  index,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>;
  data: Data;
  index: number;
}) {
  const {
    category,
    content,
    img,
    lockerId,
    name,
    shareRegDt,
    shareStatus,
    shareUser,
    useDt,
    useUser,
    useUserId,
    useUserNickname: nickName,
  } = data;
  let color;

  const [regDate, regTime] = shareRegDt.split(".")[0].split("T");
  const [useDate, useTime] = useDt.split(".")[0].split("T");
  const ImgUrl = process.env.REACT_APP_IMAGE_URL;

  switch (shareStatus) {
    case 0:
      color = "#00ff44";
      break;
    case 1:
      color = "#00f7ff";
      break;
    case 2:
      color = "#c9c9c9";
      break;
    case 3:
      color = "#ff2f00";
      break;
    case 4:
      color = "#0073ff";
      break;
    case 5:
      color = "#c9c9c9";
      break;
    default:
      color = "#c9c9c9";
      break;
  }

  return (
    <div css={container}>
      {/* x 아이콘 */}
      <div className="icon">
        <IoIosCloseCircleOutline
          size={27}
          onClick={() => {
            (dialogRef.current as any)[index].close();
          }}
        />
      </div>

      {/* 사진 */}
      <div className="img">
        <img src={`${ImgUrl}${img}`} alt="이미지" />
      </div>

      {/* 내용 */}
      <div className="box">
        <div className="title">
          <p>
            {`${lockerId}번 · `}
            <span style={{ color: `${color}` }}>
              {shareStatus === 0
                ? "수납대기"
                : shareStatus === 1
                ? "공유대기"
                : shareStatus === 2
                ? "공유중"
                : shareStatus === 3
                ? "반납대기"
                : shareStatus === 4
                ? "회수대기"
                : "회수"}
            </span>
          </p>
          <p>{`사용자 : ${nickName}`}</p>
          <p>{`등록일 : ${regDate.replaceAll("-", ".")} · ${regTime}`}</p>
          <p>{`최근 사용 : ${useDate.replaceAll("-", ".")} · ${useTime}`}</p>
        </div>
        <hr />
        <div className="content">
          <p>{`${name} · ${category}`}</p>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogModal;
