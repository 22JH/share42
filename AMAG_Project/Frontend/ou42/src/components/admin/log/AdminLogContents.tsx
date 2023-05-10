/** @jsxImportSource @emotion/react */
import { memo, useEffect, useRef } from "react";

import { contentStyle } from "../report/AdminReportContent";
import testObject from "../../../assets/testObject.jpg";

interface Data {
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
  const divRef = useRef<HTMLDivElement | any>({});

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

  console.log(listData);

  return (
    <>
      {listData?.length
        ? listData?.map((data: Data, index) => {
            console.log(data);
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
            return (
              <div
                key={`${data} / ${index}`}
                css={contentStyle}
                ref={(ref) => (divRef.current[index] = ref)}
              >
                <img src={testObject} alt="test" className="img" />
                <div className="text">
                  <p>{name}</p>
                  <p>{content}</p>
                  {/* <p>인동잭스 · 23.04.19</p> */}
                  <p>{`${nickName} · ${shareRegDt}`}</p>
                  <p>구미 인동</p>
                </div>
              </div>
            );
          })
        : null}
    </>
  );
}

export default memo(AdminLogContents);
