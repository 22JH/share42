/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */

import { AiOutlineHeart, AiTwotoneHeart, AiOutlineEye } from "react-icons/ai";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  useInfiniteQuery,
  useQueryClient,
  useQueryErrorResetBoundary,
} from "react-query";

import UserHomeSpeedDial from "../../components/user/UserHomeSpeedDial";
import * as userHomeStyle from "../../components/user/UserHomeStyle";
import ErrorBoundary from "../../components/ErrorBoundary";
import BottomMenuBar from "../../components/BottomMenuBar";
import { L, pipe, takeAll } from "./../../custom/FxJS";
import DropDown from "../../components/UI/DropDown";
import Loading from "../../components/Loading";

import testObject from "../../assets/testObject.jpg";
import { useBranchChoiceStore } from "../../components/map/store/useBranchChoiceStore";

// intersaction 옵션
const intersectionOptions = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 0.5,
};

// API_URL
const API_URL = `https://jsonplaceholder.typicode.com/comments?postId=`;

// infinityquery 함수
const getListFnc = ({ pageParam = 1 }) => {
  return axios({
    method: "get",
    url: `${API_URL}${pageParam}`,
  });
};

// 데이터 fetch 컴포넌트
function UserHomeList() {
  const [isLike, setIslike] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement | any>({});
  const { setBranchChoice } = useBranchChoiceStore();

  // 공유글 데이터 불러오는 query
  const { fetchNextPage, data, hasNextPage } = useInfiniteQuery(
    ["get-object-list"],
    getListFnc,
    {
      getNextPageParam: (lastPage, allPage) => {
        return allPage.length + 1;
      },
      useErrorBoundary: true,
      suspense: true,
      retry: 0,
      select: (data) => {
        const newData = pipe(
          L.map((arr: any) => arr.data),
          L.flatten,
          takeAll
        );
        return {
          pages: newData(data.pages),
          pageParams: data.pageParams,
        };
      },
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

  // data가 변경될 떄마다 새로운 요소를 감시한다.
  useEffect(() => {
    if (divRef?.current && data) {
      const lastIndex = data?.pages?.length - 1;
      intersection.observe(divRef?.current[lastIndex]);
    }
  }, [data]);

  // 좋아요 버튼 누름
  const like = (e: React.MouseEvent<SVGElement>) => {
    setIslike(!isLike);
  };

  useEffect(() => {
    setBranchChoice({ name: "", id: null });
  }, []);

  return (
    <>
      {data?.pages.map((data, index) => {
        return (
          <div
            className="item"
            key={index}
            ref={(ref) => {
              return (divRef.current[index] = ref);
            }}
          >
            {isLike ? (
              <div className="img-icon">
                <AiTwotoneHeart className="redHeart" size="30" onClick={like} />
              </div>
            ) : (
              <div className="img-icon">
                <AiOutlineHeart
                  style={{ fill: "white" }}
                  size="30"
                  onClick={like}
                />
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

// 에러 메세지 컴포넌트
const ErrorMsg = () => {
  const { reset } = useQueryErrorResetBoundary();

  const queryClient = useQueryClient();
  const refetch = () => {
    return queryClient.refetchQueries(["get-object-list"]);
  };

  const reTry = () => {
    reset();
    refetch();
  };

  return (
    <div css={userHomeStyle.errorMsgStyle}>
      <p>잠시 후 다시 시도해주세요</p>
      <p>요청을 처리하는데</p>
      <p>실패했습니다.</p>
      <button onClick={reTry}>다시시도</button>
    </div>
  );
};

// 상위 컴포넌트
const 임시 = ["1", "2", "3"];

function UserHome() {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <div css={userHomeStyle.content(value)} id="scrollArea">
        {/* 드롭다운 */}
        <div className="sort-bar">
          <DropDown data={임시} setValue={setValue} content={"최신순"} />
        </div>
        {/* 스피드 다이얼 */}
        <div className="speed-dial">
          <UserHomeSpeedDial />
        </div>
        {/* 컨텐츠 */}
        <div className="container">
          <ErrorBoundary fallback={ErrorMsg}>
            <Suspense fallback={<Loading />}>
              <UserHomeList />
            </Suspense>
          </ErrorBoundary>
        </div>
        <BottomMenuBar />
      </div>
    </>
  );
}

export default UserHome;
