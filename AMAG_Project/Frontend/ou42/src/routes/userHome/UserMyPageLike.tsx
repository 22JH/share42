import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { Suspense, cloneElement, useEffect } from "react";

import navStore from "../../store/navStore";
import Loading from "../../components/Loading";
import { L, pipe, takeAll } from "../../custom/FxJS";
import { useGetUserToken } from "../../hooks/useGetToken";
import BottomMenuBar from "../../components/BottomMenuBar";
import ErrorBoundary from "../../components/ErrorBoundary";
import { ErrorMessage } from "../../components/ErrorMessage";
import UserMyPageList from "../../components/user/mypage/UserMyPageList";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

function UserMyPageLikeFetcher({
  children,
}: {
  children: React.PropsWithChildren<ReactJSXElement>;
}) {
  const SIZE = 20;
  const TOKEN = useGetUserToken();

  // 물품 관련 API
  const getListFnc = ({ pageParam = 1 }) => {
    return axios({
      method: "get",
      url: `https://www.share42-together.com/api/user/mypage/like/${pageParam}/${SIZE}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["user-mypage-like-list"],
    getListFnc,
    {
      getNextPageParam: (lastPage, allPage) => {
        if (allPage[0].data.message.totalPages > allPage.length) {
          return allPage.length + 1;
        }
      },
      select: (data) => {
        const newPages = pipe(L.map, L.flatten, takeAll);

        return {
          pages: newPages((d: any) => d.data.message.content, data.pages),
          pageParams: data.pageParams,
        };
      },
    }
  );

  return cloneElement(children, { data, fetchNextPage, hasNextPage });
}

function UserMyPageLike() {
  const { setPathTitle } = navStore();

  useEffect(() => {
    setPathTitle("관심 목록");
  }, []);

  return (
    <div style={{ width: "100vw", height: "81vh" }}>
      <ErrorBoundary fallback={ErrorMessage}>
        <Suspense fallback={<Loading />}>
          <UserMyPageLikeFetcher>
            <UserMyPageList />
          </UserMyPageLikeFetcher>
        </Suspense>
      </ErrorBoundary>
      <BottomMenuBar />
    </div>
  );
}

export default UserMyPageLike;
