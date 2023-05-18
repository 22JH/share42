/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { memo, useEffect, useRef, useState } from "react";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";

import logo from "../../../assets/logo.png";

const container = (length: number, pathName: string) => css`
  width: 100%;
  height: auto;
  position: absolute;
  top: ${pathName === "/user/mypage/like" ||
  pathName === "/user/mypage/articles"
    ? "6vh"
    : "12vh"};
  overflow: auto;
  .container:nth-of-type(${length}) {
    margin-bottom: 20%;
  }

  .container {
    border-bottom: solid 1px rgba(7, 6, 6, 0.15);
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    margin-top: 3%;
    padding-bottom: 2%;
    position: relative;

    .img {
      width: 30%;
      img {
        width: 30vw;
        height: 13vh;
        border-radius: 15px;
        margin: 0 0 0 10%;
      }
    }

    .content {
      width: 70%;
      p {
        margin: 0 0 0 10%;
      }
      p:nth-of-type(1) {
        color: rgba(0, 0, 0, 0.5);
        font-size: 0.75rem;
      }
      p:nth-of-type(2) {
        margin-bottom: 5%;
      }
      p:nth-of-type(3) {
        font-weight: 900;
      }
    }

    .icon {
      display: flex;
      position: absolute;
      bottom: 2%;
      right: 5%;
      .eye {
        display: flex;
        align-items: center;
        p {
          margin: 0;
        }
        margin-right: 10%;
      }
      .heart {
        display: flex;
        align-items: center;
        p {
          margin: 0;
        }
      }
    }
  }
`;

interface Data {
  articleUptDt?: string;
  hits?: number;
  id?: number;
  img?: string;
  likeUptDt?: string;
  likecount?: number;
  nickname?: string;
  shareArticleId?: number;
  sharePrice?: number;
  shareStatus?: number;
  title?: string;
  userId?: string;
  name?: string;
  accountNickname?: string;
  accountUserId?: string;
  lockerLockerNumber?: number;
  lockerLockerStationName?: string;
  regDt?: string;
  shareArticleCategory?: string;
  shareArticleName?: string;
  useType?: number;
  price?: number;
  returnTyle?: number;
}

interface Props {
  data: { pages: Data[] | any; pageParams: number | undefined[] };
  fetchNextPage: any;
  hasNextPage: boolean;
  valueLength: number;
}

function UserMyPageList(props: Partial<Props>) {
  const navigate = useNavigate();
  const divRef = useRef<any>({});
  const pathName = useLocation().pathname;
  const imgUrl = process.env.REACT_APP_IMAGE_URL;
  const { data, fetchNextPage, hasNextPage } = props;
  const [promiseData, setPromiseData] = useState<any[]>([]);

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
  });

  useEffect(() => {
    if (divRef?.current && data?.pages?.length) {
      const lastIndex = data?.pages?.length - 1;
      intersection.observe(divRef?.current[lastIndex]);
    }
  }, [data]);

  if (data?.pages.length !== 0 && data?.pages instanceof Promise) {
    data?.pages.then((res: any) => setPromiseData(res));
  }

  return (
    <div
      css={container(
        data?.pages instanceof Promise
          ? promiseData?.length
          : data?.pages.length,
        pathName
      )}
    >
      {data?.pages?.length !== 0
        ? (data?.pages instanceof Promise ? promiseData : data?.pages).map(
            (item: Data, index: number) => {
              return (
                <div
                  className="container"
                  ref={(ref) => (divRef.current[index] = ref)}
                  key={`${item} / ${index}`}
                  onClick={
                    item.id
                      ? () => navigate(`/user/share-post/${item.id}`)
                      : () => {}
                  }
                >
                  <div className="img">
                    <img
                      src={item?.img ? `${imgUrl}${item?.img}` : logo}
                      alt="사진"
                    />
                  </div>
                  <div className="content">
                    {/* <p>싸피맨</p> */}
                    <p>
                      {pathName === "/user/mypage/like" ||
                      pathName === "/user/mypage/articles"
                        ? item?.nickname
                        : item?.accountNickname}
                    </p>
                    {/* <p>드라이버 공유합니다</p> */}
                    <p>
                      {pathName === "/user/mypage/like"
                        ? item?.title
                        : pathName === "/user/mypage/articles"
                        ? item?.name
                        : item?.lockerLockerStationName}
                    </p>
                    {/* <p>사용 중</p> */}
                    <p>
                      {pathName === "/user/mypage/like" ||
                      pathName === "/user/mypage/articles"
                        ? `${item?.sharePrice?.toLocaleString()}원`
                        : `${item?.shareArticleName} · ${item?.shareArticleCategory}`}
                    </p>
                  </div>

                  <div className="icon">
                    {pathName === "/user/mypage/like" ||
                    pathName === "/user/mypage/articles" ? (
                      <div className="eye">
                        <AiOutlineEye />
                        <p>{item?.hits}</p>
                      </div>
                    ) : (
                      <div className="eye">
                        <p>
                          {item?.regDt
                            ?.split(".")[0]
                            .split("T")[0]
                            .replaceAll("-", ".")}
                        </p>
                      </div>
                    )}

                    {pathName === "/user/mypage/like" ||
                    pathName === "/user/mypage/articles" ? (
                      <div className="heart">
                        <AiOutlineHeart />
                        <p>{item?.likecount ?? 0}</p>
                      </div>
                    ) : (
                      <div className="heart">
                        <p>
                          {item?.regDt?.split(".")[0].split("T")[1].slice(0, 5)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          )
        : null}
    </div>
  );
}

export default memo(UserMyPageList);
