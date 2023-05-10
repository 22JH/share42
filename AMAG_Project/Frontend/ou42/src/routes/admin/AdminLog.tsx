/** @jsxImportSource @emotion/react */

import {
  cloneElement,
  PropsWithChildren,
  Suspense,
  useEffect,
  useState,
} from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useQuery, useQueryClient } from "react-query";

import AdminLogContents from "../../components/admin/log/AdminLogContents";
import AdminSelectBox from "../../components/admin/AdminSelectBox";
import BottomMenuBar from "../../components/BottomMenuBar";
import ErrorBoundary from "../../components/ErrorBoundary";
import AdminNav from "./../../components/admin/AdminNav";
import Loading from "./../../components/Loading";

import axios from "axios";
import { ErrorMessage } from "../../components/ErrorMessage";

export interface Area {
  region: string;
  point: string;
  number: string;
}

const TOKEN = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjEyMyIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNjgzNzA4OTI5fQ.i9pqfxX2qI7jYeokz9jdasPTstrHHrliSOtRRQXFLo9FNH-39gsrKdktP6kMtOXWSSJ2lTzUJwFPtcN8ShVh0g`;

// 지역 API 함수
const rigionAPI = () => {
  return axios({
    method: "get",
    url: `http://www.share42-together.com:8088/api/admin/lockers/address/sido`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
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
      return data.data.message;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["admin-point"], () => {
        return [];
      });
    },
  });

  // 지점 API 함수
  const pointAPI = () => {
    return axios({
      method: "get",
      url: `http://www.share42-together.com:8088/api/admin/lockers/address/sido/${areaInfo.region}`,
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

// 리스트 요청 API 함수
const listAPI = () => {
  return axios({
    method: "get",
    // url: `http://www.share42-together.com:8088/api/admin/lockers/log/{lockerStationId}/{page}/{size}`,
    url: `https://jsonplaceholder.typicode.com/todos/1`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
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
  console.log(areaInfo);

  const { data: listData } = useQuery(["admin-list"], listAPI, {
    enabled: !!areaInfo.point,
  });

  useEffect(() => {
    queryClient.prefetchQuery(["admin-list"], listAPI);
  }, [areaInfo]);

  return cloneElement(children, { listData });
}

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
