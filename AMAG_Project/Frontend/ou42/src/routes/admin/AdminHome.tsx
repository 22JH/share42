import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { cloneElement, Suspense, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

import AdminHomeCircleChart from "../../components/admin/home/AdminHomeCircleChart";
import AdminHomeBarChart from "../../components/admin/home/AdminHomeBarChart";
import AdminHomeMenuBtn from "../../components/admin/home/AdminHomeMenuBtn";
import AdminHomeTitle from "../../components/admin/home/AdminHomeTitle";
import { ErrorMessage } from "./../../components/ErrorMessage";
import ErrorBoundary from "./../../components/ErrorBoundary";
import { useGetUserToken } from "./../../hooks/useGetToken";
import { L, pipe, takeAll } from "../../custom/FxJS";
import Loading from "./../../components/Loading";

export interface Change {
  isChange: boolean;
  region: string;
}

function AdminHomeCircleChartFetchter({
  children,
}: {
  children: React.PropsWithChildren<ReactJSXElement>;
}) {
  const TOKEN = useGetUserToken();

  const { data } = useQuery(
    ["admin-circle-chart"],
    () => {
      return axios({
        method: "get",
        url: `https://www.share42-together.com/api/admin/log/sido`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    },
    {
      cacheTime: 300 * 1000 * 3,
      staleTime: 300 * 1000 * 3,
      select: (data) => {
        const newData = pipe(L.map, takeAll);
        return newData((d: any) => [d.count, d.sido], data.data.message);
      },
    }
  );

  return cloneElement(children, { data });
}
function AdminHomeBarChartFetchter({
  children,
  change,
}: {
  children: React.PropsWithChildren<ReactJSXElement>;
  change: Change;
}) {
  const TOKEN = useGetUserToken();
  const queryClient = useQueryClient();

  const { data } = useQuery(
    ["admin-bar-chart"],
    () => {
      return axios({
        method: "get",
        url: `https://www.share42-together.com/api/admin/log/sido/${change.region}`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    },
    {
      cacheTime: 300 * 1000 * 3,
      staleTime: 300 * 1000 * 3,
      select: (data) => {
        return data.data.message;
      },

      enabled: !!change.region,
    }
  );

  useEffect(() => {
    if (change.region) {
      queryClient.prefetchQuery(["admin-bar-chart"]);
    }
  }, [change.region]);

  return cloneElement(children, { data });
}

function AdminHome() {
  const [change, setChange] = useState<Change>({
    isChange: false,
    region: "",
  });
  return (
    <div style={{ width: "100vw", height: "84vh" }}>
      {/* 타이틀 */}
      <AdminHomeTitle />

      <ErrorBoundary fallback={ErrorMessage}>
        <Suspense fallback={<Loading />}>
          {!change.isChange ? (
            <AdminHomeCircleChartFetchter>
              {/* 원 차트 */}
              <AdminHomeCircleChart setChange={setChange} />
            </AdminHomeCircleChartFetchter>
          ) : (
            <AdminHomeBarChartFetchter change={change}>
              {/* 바 차트 */}
              <AdminHomeBarChart setChange={setChange} />
            </AdminHomeBarChartFetchter>
          )}
        </Suspense>
      </ErrorBoundary>
      {/* 메뉴 버튼 */}
      <AdminHomeMenuBtn />
    </div>
  );
}

export default AdminHome;
