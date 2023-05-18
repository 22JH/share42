import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import {
  cloneElement,
  PropsWithChildren,
  Suspense,
  useEffect,
  useState,
} from "react";

import { Area } from "./AdminLog";
import Loading from "./../../components/Loading";
import AdminNav from "../../components/admin/AdminNav";
import { useGetUserToken } from "../../hooks/useGetToken";
import BottomMenuBar from "../../components/BottomMenuBar";
import ErrorBoundary from "../../components/ErrorBoundary";
import { ErrorMessage } from "./../../components/ErrorMessage";
import AdminSelectBox from "../../components/admin/AdminSelectBox";

function AdminOperationFetcher({
  children,
  areaInfo,
}: {
  children: PropsWithChildren<ReactJSXElement>;
  areaInfo: Area;
}) {
  const TOKEN = useGetUserToken();
  const queryClient = useQueryClient();

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

  const { data: pointData } = useQuery(["admin-point"], pointAPI, {
    enabled: !!areaInfo.region,
    select: (data) => {
      if (data.data) {
        return data.data.message;
      }
    },
  });

  // 번호 API 함수
  const numberAPI = () => {
    return axios({
      method: "get",
      url: `https://www.share42-together.com/api/admin/lockers/${areaInfo.point}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  };

  const { data: numberData } = useQuery(["admin-number"], numberAPI, {
    enabled: !!areaInfo.point,
    select: (data) => {
      if (data.data) {
        return data.data.message;
      }
    },
  });

  useEffect(() => {
    queryClient.prefetchQuery(["admin-region"], rigionAPI);
    // queryClient.prefetchQuery(["admin-point"], pointAPI);
    // queryClient.prefetchQuery(["admin-number"], numberAPI);
  }, [areaInfo]);

  return cloneElement(children, { regionData, pointData, numberData });
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
