/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { Suspense, cloneElement, useEffect } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

import navStore from "../../store/navStore";
import { L, pipe, takeAll } from "../../custom/FxJS";
import { useGetUserToken } from "../../hooks/useGetToken";
import BottomMenuBar from "../../components/BottomMenuBar";
import UserMyPageList from "../../components/user/mypage/UserMyPageList";
import ErrorBoundary from "../../components/ErrorBoundary";
import { ErrorMessage } from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

const container = css`
  width: 100vw;
  height: 85vh;
`;
function UserMyPageMyArticlesFetcher({
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
      url: `https://www.share42-together.com/api/user/mypage/posts/${pageParam}/${SIZE}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["user-mypage-article-list"],
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

function UserMyPageMyArticles() {
  const { setPathTitle } = navStore();

  useEffect(() => {
    setPathTitle("내가 쓴 글");
  }, []);

  return (
    <div css={container}>
      <ErrorBoundary fallback={ErrorMessage}>
        <Suspense fallback={<Loading />}>
          <UserMyPageMyArticlesFetcher>
            <UserMyPageList />
          </UserMyPageMyArticlesFetcher>
        </Suspense>
      </ErrorBoundary>
      <BottomMenuBar />
    </div>
  );
}

export default UserMyPageMyArticles;
