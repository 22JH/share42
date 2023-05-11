/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { memo, useEffect, useRef } from "react";

import { contentStyle, dialog } from "../report/AdminReportContent";
import pinkBox from "../../../assets/pinkBox.png";
import AdminLogModal from "./AdminLogModal";

const contents = css`
  .emptyList {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 25%;
    p {
      font-size: 1.6rem;
      font-weight: 900;
    }
    img {
      width: 30%;
      height: 20%;
    }
  }
`;

export interface Data {
  category: string;
  content: string;
  img: string;
  lockerId: number;
  name: string;
  shareRegDt: string;
  shareStatus: number;
  shareUser: number;
  useDt: string;
  useUser: string;
  useUserId: number;
  useUserNickname: string;
}

interface Props {
  listData?: Data[];
  fetchNextPage?: any;
  hasNextPage?: boolean;
}

// intersaction 옵션
const intersectionOptions = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 0.5,
};

function AdminLogContents(props: Props) {
  const { listData, fetchNextPage, hasNextPage } = props;
  const dialogRef = useRef<HTMLDialogElement | any>({});
  const divRef = useRef<HTMLDivElement | any>({});

  const ImgUrl = process.env.REACT_APP_IMAGE_URL;
  const LENGTH = listData?.length;

  // 생성된 객체 중 마지막 객체가 인식되면 다시 query를 호출한다.
  const intersection = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    });
  }, intersectionOptions);

  useEffect(() => {
    if (divRef?.current && listData?.length) {
      const lastIndex = listData?.length - 1;
      intersection.observe(divRef?.current[lastIndex]);
    }
  }, [listData]);

  return (
    <div css={contents}>
      {listData?.length ? (
        listData?.map((data: Data, index) => {
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

          const date = shareRegDt.split("T")[0].replaceAll("-", ".");

          return (
            <div key={`${data} / ${index}`}>
              {/* 목록 */}
              <div
                css={contentStyle(LENGTH)}
                ref={(ref) => (divRef.current[index] = ref)}
                onClick={() => {
                  dialogRef?.current[index].showModal();
                }}
              >
                <img src={`${ImgUrl}${img}`} alt="test" className="img" />
                <div className="text">
                  <p>{name}</p>
                  <p>{content}</p>
                  <p>{`${nickName} · ${date}`}</p>
                  <p>{`${category} · ${lockerId}번`}</p>
                </div>
              </div>

              {/* modal */}
              <dialog
                ref={(ref) => {
                  return (dialogRef.current[index] = ref);
                }}
                css={dialog}
              >
                <AdminLogModal
                  dialogRef={dialogRef}
                  data={data}
                  index={index}
                />
              </dialog>
            </div>
          );
        })
      ) : (
        <div className="emptyList">
          <p>빈 리스트입니다</p>
          <img src={pinkBox} alt="빈 리스트" />
        </div>
      )}
    </div>
  );
}

export default memo(AdminLogContents);
