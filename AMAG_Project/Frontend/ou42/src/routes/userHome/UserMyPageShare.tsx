/** @jsxImportSource @emotion/react */

import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { cloneElement, memo, Suspense, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

import UserMyPageListBtn from "../../components/user/mypage/UserMyPageListBtn";
import UserMyPageList from "../../components/user/mypage/UserMyPageList";
import { ErrorMessage } from "../../components/ErrorMessage";
import BottomMenuBar from "../../components/BottomMenuBar";
import ErrorBoundary from "../../components/ErrorBoundary";
import Loading from "./../../components/Loading";
import navStore from "../../store/navStore";

// API 요청 함수
function UserMyPageShareFetcher({
  children,
  value,
  valueLength,
}: {
  children: React.PropsWithChildren<ReactJSXElement>;
  value: number;
  valueLength: number;
}) {
  const API = `https://jsonplaceholder.typicode.com/todos/1`;
  const queryFn = () => {
    return axios({
      method: "get",
      url: API,
    });
  };
  const queryClient = useQueryClient();

  const { data } = useQuery(["user-mypage-share", value], queryFn, {
    cacheTime: 300 * 1000,
    staleTime: 300 * 1000,
  });

  console.log("렌더링");

  useEffect(() => {
    for (let i = 0; i < valueLength; i++) {
      queryClient.prefetchQuery(["user-mypage-share", i], queryFn, {
        cacheTime: 300 * 1000,
        staleTime: 300 * 1000,
      });
    }
  }, []);

  return cloneElement(children);
}

// 메인 컴포넌트
function UserMyPageShare() {
  const { setPathTitle } = navStore();
  const [value, setValue] = useState<number>(0);
  const [valueLength, setValueLength] = useState<number>(0);

  useEffect(() => {
    setPathTitle("공유 등록한 물품");
  }, []);

  return (
    <div style={{ width: "100vw", height: "81vh" }}>
      <UserMyPageListBtn
        setValue={setValue}
        value={value}
        setValueLength={setValueLength}
      />

      <ErrorBoundary fallback={ErrorMessage}>
        <Suspense fallback={<Loading />}>
          <UserMyPageShareFetcher value={value} valueLength={valueLength}>
            <UserMyPageList />
          </UserMyPageShareFetcher>
        </Suspense>
      </ErrorBoundary>

      <BottomMenuBar />
    </div>
  );
}

export default memo(UserMyPageShare);
