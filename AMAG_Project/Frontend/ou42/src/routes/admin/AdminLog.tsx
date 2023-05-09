/** @jsxImportSource @emotion/react */

import {
  cloneElement,
  PropsWithChildren,
  Suspense,
  useEffect,
  useState,
} from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import {
  useQuery,
  useQueryClient,
  useQueryErrorResetBoundary,
} from "react-query";

import AdminLogContents from "../../components/admin/log/AdminLogContents";
import * as userHomeStyle from "../../components/user/UserHomeStyle";
import AdminSelectBox from "../../components/admin/AdminSelectBox";
import BottomMenuBar from "../../components/BottomMenuBar";
import ErrorBoundary from "../../components/ErrorBoundary";
import AdminNav from "./../../components/admin/AdminNav";
import Loading from "./../../components/Loading";

import axios from "axios";

export interface Area {
  region: string;
  point: string;
  number: string;
}

// 지역 API 함수
const rigionAPI = () => {
  return axios({
    method: "get",
    url: `https://jsonplaceholder.typicode.com/todos/1`,
  });
};

// 지점 API 함수
const pointAPI = () => {
  return axios({
    method: "get",
    url: `https://jsonplaceholder.typicode.com/todos/1`,
  });
};

// 지점 정보 Fetcher 컴포넌트
function AdminLogFetcher({
  children,
  areaInfo,
}: {
  children: PropsWithChildren<ReactJSXElement>;
  areaInfo: Area;
}) {
  const queryClient = useQueryClient();

  // 지역 호출 query
  const { data: regionData } = useQuery(["admin-region"], rigionAPI, {
    select: (data) => {
      return data.data;
    },
  });

  // 지점 호출 query
  const { data: pointData } = useQuery(["admin-point"], pointAPI, {
    enabled: !!areaInfo.region,
  });

  useEffect(() => {
    queryClient.prefetchQuery(["admin-region"], rigionAPI);
    queryClient.prefetchQuery(["admin-point"], pointAPI);
  }, [areaInfo]);

  return cloneElement(children, { regionData, pointData });
}

// 리스트 요청 API 함수
const listAPI = () => {
  return axios({
    method: "get",
    url: `https://jsonplaceholder.typicode.com/todos/1`,
  });
};

// list fetcher 컴포넌트
function AdminLogListFetcher({
  children,
  areaInfo,
}: {
  children: PropsWithChildren<ReactJSXElement>;
  areaInfo: Area;
}) {
  const queryClient = useQueryClient();

  const { data: listData } = useQuery(["admin-list"], listAPI, {
    enabled: !!areaInfo.point,
  });

  useEffect(() => {
    queryClient.prefetchQuery(["admin-list"], listAPI);
  }, [areaInfo]);

  return cloneElement(children, { listData });
}

// 에러 메세지 컴포넌트
const ErrorMessage = () => {
  const { reset } = useQueryErrorResetBoundary();

  const queryClient = useQueryClient();
  const refetch = () => {
    return queryClient.refetchQueries(["admin-region"]);
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

function AdminLog() {
  const [areaInfo, setAreaInfo] = useState<Area>({
    region: "",
    point: "",
    number: "",
  });

  return (
    <>
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
    </>
  );
}

export default AdminLog;
