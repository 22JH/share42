import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { Suspense, cloneElement, useEffect } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

import navStore from "./../../store/navStore";
import Loading from "../../components/Loading";
import { useGetUserToken } from "../../hooks/useGetToken";
import ErrorBoundary from "../../components/ErrorBoundary";
import BottomMenuBar from "../../components/BottomMenuBar";
import { ErrorMessage } from "../../components/ErrorMessage";
import UserMyPageETC from "../../components/user/mypage/UserMyPageETC";
import UserMyPageMyTrade from "../../components/user/mypage/UserMyPageMyTrade";
import UserMyPageProfile from "../../components/user/mypage/UserMyPageProfile";
import UserMyPageChart from "./../../components/user/mypage/UserMyPageChart";

function UserMyPageFetcher({
  children,
}: {
  children: React.PropsWithChildren<ReactJSXElement>;
}) {
  const TOKEN = useGetUserToken();
  const queryClient = useQueryClient();

  // 사용자 정보 받는 API 함수
  const userInfo = () => {
    return axios({
      method: "get",
      url: `https://www.share42-together.com/api/user/info`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  };

  const { data: message } = useQuery(["user-info"], userInfo, {
    suspense: false,
    cacheTime: 1000 * 60 * 30,
    staleTime: 1000 * 60 * 30,
    select: (data) => {
      return data.data.message;
    },
  });

  useEffect(() => {
    queryClient.prefetchQuery(["user-info"], userInfo);
  }, []);

  return cloneElement(children, { info: message });
}

function UserMyPage() {
  const { setPathTitle } = navStore();
  useEffect(() => {
    setPathTitle("마이 페이지");
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "85vh",
        position: "absolute",
        top: "7vh",
        overflow: "auto",
      }}
    >
      <ErrorBoundary fallback={ErrorMessage}>
        <Suspense fallback={<Loading />}>
          <UserMyPageFetcher>
            {/* 프로필 */}
            <UserMyPageProfile />
          </UserMyPageFetcher>

          {/* 수익 차트 */}
          <UserMyPageChart />

          {/* 나의 거래 */}
          <UserMyPageMyTrade />

          {/* 기타 */}
          <UserMyPageETC />
        </Suspense>
      </ErrorBoundary>

      {/* 하단 메뉴 */}
      <BottomMenuBar />
    </div>
  );
}

export default UserMyPage;
