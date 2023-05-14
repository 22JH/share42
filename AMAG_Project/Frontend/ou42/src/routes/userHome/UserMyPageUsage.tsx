import axios from "axios";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Suspense, cloneElement, memo, useEffect, useState } from "react";

import navStore from "../../store/navStore";
import Loading from "../../components/Loading";
import { useGetUserToken } from "../../hooks/useGetToken";
import ErrorBoundary from "../../components/ErrorBoundary";
import BottomMenuBar from "../../components/BottomMenuBar";
import { ErrorMessage } from "../../components/ErrorMessage";
import UserMyPageList from "../../components/user/mypage/UserMyPageList";
import UserMyPageListBtn from "../../components/user/mypage/UserMyPageListBtn";
import { C, L, pipe, takeAll } from "../../custom/FxJS";

function UserMyPageUsageFetcher({
  children,
  value,
}: {
  children: React.PropsWithChildren<ReactJSXElement>;
  value: number;
}) {
  const SIZE = 20;
  const TOKEN = useGetUserToken();
  const queryClient = useQueryClient();

  // 물품 관련 API
  const getListFnc = ({ pageParam = 1 }) => {
    return axios({
      method: "get",
      url: `https://www.share42-together.com/api/user/mypage/share-articles/${pageParam}/${SIZE}/${value}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["user-mypage-list"],
    getListFnc,
    {
      getNextPageParam: (lastPage, allPage) => {
        if (allPage[0].data.message.totalPages > allPage.length) {
          return allPage.length + 1;
        }
      },
      select: (data) => {
        const newPages = pipe(
          L.map,
          L.flatten,
          L.map((d: any) => axios(d.metadataUri)),
          L.map((d: any) => d.data),
          C.take(Infinity)
        );

        return {
          pages: newPages((d: any) => d.data.message, data.pages),
          pageParams: data.pageParams,
        };
      },
    }
  );

  useEffect(() => {
    queryClient.prefetchInfiniteQuery(["user-mypage-list"], getListFnc);
  }, [value]);

  return cloneElement(children, { data, fetchNextPage, hasNextPage });
}

function UserMyPageUsage() {
  const { setPathTitle } = navStore();
  const [value, setValue] = useState<number>(2);
  const [valueLength, setValueLength] = useState<number>(0);

  useEffect(() => {
    setPathTitle("사용 내역");
  }, []);

  return (
    <>
      <div style={{ width: "100vw", height: "81vh" }}>
        <UserMyPageListBtn setValue={setValue} value={value} />
        <ErrorBoundary fallback={ErrorMessage}>
          <Suspense fallback={<Loading />}>
            <UserMyPageUsageFetcher value={value}>
              {/* 사용 내역 리스트 */}
              <MemoUserMyPageList valueLength={valueLength} />
            </UserMyPageUsageFetcher>
          </Suspense>
        </ErrorBoundary>
      </div>
      <BottomMenuBar />
    </>
  );
}

const MemoUserMyPageList = memo(UserMyPageList);

export default UserMyPageUsage;
