/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import testObject from "../../assets/testObject.jpg";

import { AiOutlineHeart, AiTwotoneHeart, AiOutlineEye } from "react-icons/ai";

import { Suspense, useEffect, useRef, useState } from "react";

import { useInfiniteQuery } from "react-query";

import axios from "axios";
import Loading from "../../components/Loading";
import ErrorBoundary from "../../components/ErrorBoundary";

const content = css`
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    flex: 1 1 35%;
    height: 30vh;
    position: relative;

    .img-icon {
      position: absolute;
      right: 5%;
      bottom: 17%;
    }

    &:nth-of-type(2n + 1) {
      margin: 6% 2% 8% 4%;
    }

    &:nth-of-type(2n) {
      margin: 6% 4% 8% 2%;
    }

    .img {
      width: 100%;
      height: 85%;
      margin-bottom: 3%;
      border-radius: 25px;
    }

    & p {
      margin: 0 0 0 2%;
      color: #a3a3a3;
    }

    & p:nth-of-type(1) {
      font-size: 1rem;
      font-weight: 600;
      color: black;
      margin-bottom: 2%;
    }

    & p:nth-of-type(2) {
      font-weight: 500;
      font-size: 0.7rem;
      color: black;
      margin-bottom: 2%;
    }

    & p:nth-of-type(3) {
      font-size: 0.625rem;
    }

    .icon {
      text-align: end;
      display: flex;
      justify-content: end;

      .eye {
        fill: black;
        display: flex;
        align-items: center;
        & > span {
          font-size: 0.75rem;
        }

        margin-right: 5%;
      }

      .heart {
        fill: black;
        display: flex;
        align-items: center;
        & > span {
          font-size: 0.75rem;
        }
      }
    }

    .redHeart {
      fill: #ff571a;
      animation-name: change;
      animation-duration: 0.4s;

      @keyframes change {
        0% {
          fill: #ff571a;
          transform: scale(0);
        }

        60% {
          fill: #ff571a;
          transform: scale(1.3);
          border-radius: 50%;
          filter: drop-shadow(1px 1px 4px #ff571a);
        }

        100% {
          fill: #ff571a;
          transform: scale(1);
        }
      }
    }
  }
`;

// intersaction 옵션
const intersectionOptions = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 0.3,
};

// 테스트 데이터
const sampleData = [1, 2, 3, 4, 5, 6, 7, 8];

export const getListFnc = ({ pageParam = 1 }) => {
  return axios({
    method: "get",
    url: `${API_URL}${pageParam}`,
  });
};

// API_URL
const API_URL = `https://jsonplaceholder.typicode.com/comment?postId=`;

function UserHomeList() {
  const [isLike, setIslike] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement | any>({});

  // 공유글 데이터 불러오는 query
  const { fetchNextPage, data, hasNextPage, isFetched } = useInfiniteQuery(
    "get-object-list",
    getListFnc,
    {
      getNextPageParam: (lastPage, allPage) => {
        return;
      },
      useErrorBoundary: true,
      suspense: true,
      retry: 1,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );

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

  console.log(isFetched);

  // data가 변경될 떄마다 새로운 요소를 감시한다.
  useEffect(() => {
    if (divRef?.current && data) {
      let lastPage = 0;
      intersection.observe(divRef?.current[lastPage]);
    }
  }, [data]);

  // 좋아요 버튼 누름
  const like = () => {
    setIslike(!isLike);
  };

  return (
    <>
      {sampleData.map((data, index) => {
        return (
          <div
            className="item"
            key={index}
            ref={(ref) => {
              return (divRef.current[index] = ref);
            }}
          >
            {isLike ? (
              <div className="img-icon" onClick={like}>
                <AiTwotoneHeart className="redHeart" size="30" />
              </div>
            ) : (
              <div className="img-icon" onClick={like}>
                <AiOutlineHeart style={{ fill: "white" }} size="30" />
              </div>
            )}
            <img src={testObject} alt="test" className="img" />

            <p>5,000,000원</p>
            <p>드라이버 공유합니다.</p>
            <p>서울 · 2분전</p>

            <div className="icon">
              <span className="eye">
                <AiOutlineEye />
                <span>12</span>
              </span>

              <div className="heart">
                <AiOutlineHeart />
                <span>12</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

const ErrorMsg = (error: any) => {
  return (
    <div>
      {/* You can use your own styling and methods of handling error */}
      <p>Something went wrong!</p>
      <p>{error.error.message}</p>
    </div>
  );
};

function UserHome() {
  return (
    <>
      <div css={content} id="scrollArea">
        <div className="container">
          <ErrorBoundary fallback={ErrorMsg}>
            <Suspense fallback={<Loading />}>
              <UserHomeList />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}

export default UserHome;
