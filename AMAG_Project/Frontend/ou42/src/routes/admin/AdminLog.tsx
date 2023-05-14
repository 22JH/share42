/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import {
  cloneElement,
  PropsWithChildren,
  Suspense,
  useEffect,
  useState,
} from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import axios from "axios";

import AdminLogContents from "../../components/admin/log/AdminLogContents";
import AdminSelectBox from "../../components/admin/AdminSelectBox";
import { ErrorMessage } from "../../components/ErrorMessage";
import BottomMenuBar from "../../components/BottomMenuBar";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useGetUserToken } from "../../hooks/useGetToken";
import AdminNav from "./../../components/admin/AdminNav";
import Loading from "./../../components/Loading";
import { L, pipe, takeAll } from "../../custom/FxJS";

const container = css`
  width: 100vw;
  height: 90vh;
`;

export interface Area {
  region: string;
  point: string;
  number: string;
}

// 지점 정보 Fetcher 컴포넌트
function AdminLogFetcher({
  children,
  areaInfo,
}: {
  children: PropsWithChildren<ReactJSXElement>;
  areaInfo: Area;
}) {
  const queryClient = useQueryClient();
  const TOKEN = useGetUserToken();

  // 지역 API 함수
  const rigionAPI = () => {
    return axios({
      method: "get",
      url: `https://www.share42-together.com/api/admin/lockers/address/sido`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  };

  // 지역 호출 query
  const { data: regionData } = useQuery(["admin-region"], rigionAPI, {
    select: (data) => {
      return data.data.message;
    },
  });

  // 지점 API 함수
  const pointAPI = () => {
    return axios({
      method: "get",
      url: `https://www.share42-together.com/api/admin/lockers/address/sido/${areaInfo.region}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  };

  // 지점 호출 query
  const { data: pointData } = useQuery(["admin-point"], pointAPI, {
    enabled: !!areaInfo.region,
    select: (data) => {
      if (data.data) {
        return data.data.message;
      }
    },
  });

  useEffect(() => {
    queryClient.prefetchQuery(["admin-region"], rigionAPI);
  }, [areaInfo]);

  return cloneElement(children, { regionData, pointData });
}

// list fetcher 컴포넌트
function AdminLogListFetcher({
  children,
  areaInfo,
}: {
  children: PropsWithChildren<ReactJSXElement>;
  areaInfo: Area;
}) {
  const TOKEN = useGetUserToken();
  const SIZE = 5;

  // 리스트 요청 API 함수
  const listAPI = ({ pageParam = 1 }) => {
    return axios({
      method: "get",
      url: `https://www.share42-together.com/api/admin/log/${areaInfo.point}/${pageParam}/${SIZE}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  };

  const {
    data: listData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["admin-list"], listAPI, {
    enabled: !!areaInfo.point,
    select: (data) => {
      const newData = pipe(L.map, L.flatten, takeAll);
      const mapFnc = (d: any) => d.data.message.content;

      return {
        pages: newData(mapFnc, data.pages),
        pageParams: data.pageParams,
      };
    },
    getNextPageParam: (lastPage, allPage) => {
      if (allPage[0].data.message.totalPages > allPage.length) {
        return allPage.length + 1;
      }
    },
    refetchOnMount: true,
  });

  return cloneElement(children, {
    listData: listData?.pages,
    fetchNextPage,
    hasNextPage,
  });
}

function AdminLog() {
  const [areaInfo, setAreaInfo] = useState<Area>({
    region: "",
    point: "",
    number: "",
  });

  return (
    <div css={container}>
      {/* 네브바 */}
      <AdminNav />

      <ErrorBoundary fallback={ErrorMessage}>
        <Suspense fallback={<Loading />}>
          <AdminLogFetcher areaInfo={areaInfo}>
            {/* 선택 박스 */}
            <AdminSelectBox setAreaInfo={setAreaInfo} areaInfo={areaInfo} />
          </AdminLogFetcher>

          <AdminLogListFetcher areaInfo={areaInfo}>
            {/* 컨텐츠 */}
            <AdminLogContents />
          </AdminLogListFetcher>
        </Suspense>
      </ErrorBoundary>

      {/* 하단 네브바 */}
      <BottomMenuBar />
    </div>
  );
}

export default AdminLog;
