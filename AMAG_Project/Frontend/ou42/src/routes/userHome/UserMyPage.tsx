import { Suspense, cloneElement, useEffect } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

import { useQueryClient } from "react-query";
import navStore from "./../../store/navStore";
import Loading from "../../components/Loading";
import ErrorBoundary from "../../components/ErrorBoundary";
import BottomMenuBar from "../../components/BottomMenuBar";
import { ErrorMessage } from "../../components/ErrorMessage";
import UserMyPageETC from "../../components/user/mypage/UserMyPageETC";
import UserMyPageMyTrade from "../../components/user/mypage/UserMyPageMyTrade";
import UserMyPageProfile from "../../components/user/mypage/UserMyPageProfile";

function UserMyPageFetcher({
  children,
}: {
  children: React.PropsWithChildren<ReactJSXElement>;
}) {
  const queryClient = useQueryClient();

  const {
    data: { message },
  }: any = queryClient.getQueryData(["user-info"]);

  return cloneElement(children, { info: message });
}

function UserMyPage() {
  const { setPathTitle } = navStore();
  useEffect(() => {
    setPathTitle("마이 페이지");
  }, []);

  return (
    <div style={{ width: "100vw", height: "85vh" }}>
      <ErrorBoundary fallback={ErrorMessage}>
        <Suspense fallback={<Loading />}>
          <UserMyPageFetcher>
            {/* 프로필 */}
            <UserMyPageProfile />
          </UserMyPageFetcher>

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
