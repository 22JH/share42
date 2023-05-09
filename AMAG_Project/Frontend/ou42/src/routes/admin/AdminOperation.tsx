import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import {
  cloneElement,
  PropsWithChildren,
  Suspense,
  useEffect,
  useState,
} from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

import AdminSelectBox from "../../components/admin/AdminSelectBox";
import BottomMenuBar from "../../components/BottomMenuBar";
import ErrorBoundary from "../../components/ErrorBoundary";
import AdminNav from "../../components/admin/AdminNav";
import Loading from "./../../components/Loading";
import { Area } from "./AdminLog";

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

// 번호 API 함수
const numberAPI = () => {
  return axios({
    method: "get",
    url: `https://jsonplaceholder.typicode.com/todos/1`,
  });
};

function AdminOperationFetcher({
  children,
  areaInfo,
}: {
  children: PropsWithChildren<ReactJSXElement>;
  areaInfo: Area;
}) {
  const queryClient = useQueryClient();
  const { data: regionData } = useQuery(["admin-region"], rigionAPI, {
    select: (data) => {
      return data.data;
    },
  });
  const { data: pointData } = useQuery(["admin-point"], pointAPI, {
    enabled: !!areaInfo.region,
  });
  const { data: numberData } = useQuery(["admin-number"], numberAPI, {
    enabled: !!areaInfo.point,
  });

  useEffect(() => {
    queryClient.prefetchQuery(["admin-region"], rigionAPI);
    queryClient.prefetchQuery(["admin-point"], pointAPI);
    queryClient.prefetchQuery(["admin-number"], numberAPI);
  }, [areaInfo]);

  return cloneElement(children, { regionData, pointData, numberData });
}

function ErrorMessage() {
  return (
    <>
      <p>에러입니다.</p>
    </>
  );
}

function AdminOperation() {
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
          <AdminOperationFetcher areaInfo={areaInfo}>
            {/* 선택 박스 */}
            <AdminSelectBox setAreaInfo={setAreaInfo} areaInfo={areaInfo} />
          </AdminOperationFetcher>
        </Suspense>
      </ErrorBoundary>

      {/* 하단 네브바 */}
      <BottomMenuBar />
    </>
  );
}

export default AdminOperation;
