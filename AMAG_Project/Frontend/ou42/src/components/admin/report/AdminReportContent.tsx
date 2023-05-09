/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

import { cloneElement, Suspense, useEffect, useRef } from "react";
import {
  useInfiniteQuery,
  InfiniteQueryObserverResult,
  FetchNextPageOptions,
  useQueryErrorResetBoundary,
  useQueryClient,
} from "react-query";
import axios, { AxiosError } from "axios";

import * as userHomeStyle from "../../user/UserHomeStyle";
import testObject from "../../../assets/testObject.jpg";
import pinkBox from "../../../assets/pinkBox.png";
import ErrorBoundary from "../../ErrorBoundary";
import * as FxJS from "../../../custom/FxJS";
import Loading from "../../Loading";
import adminStore from "../../../store/adminStore";

export const contentStyle = css`
  width: 100%;
  border-bottom: 1px solid #dddddd;
  height: 15vh;
  display: flex;
  align-items: center;

  .img {
    width: 28%;
    height: 85%;
    border-radius: 15px;
    margin: 0 5% 0 5%;
  }
  .text {
    p {
      margin: 0;
    }
    p:nth-of-type(1) {
      font-weight: 900;
      margin: 0 0 0 0;
      font-size: 1.1225rem;
    }
    p:nth-of-type(2) {
      color: #8b8b8b;
      margin: 2% 0 0 0;
      font-weight: 500;
      font-size: 0.75rem;
    }
    p:nth-of-type(3) {
      font-size: 0.75rem;
      margin: 5% 0 0 0;
      font-weight: 300;
    }
    p:nth-of-type(4) {
      font-size: 0.75rem;
      margin: 5% 0 0 0;
      color: #bababa;
    }
  }
`;

const emptyBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75%;
  img {
    width: 40%;
    height: 33%;
  }
  p {
    font-size: 1.4rem;
    font-weight: 900;
  }
`;

// api 받는 컴포넌트
function AdminReportFatcher(props: {
  children: React.PropsWithChildren<ReactJSXElement>;
}) {
  const { children } = props;
  const SIZE = 8;
  const { category } = adminStore();

  const queryClient = useQueryClient();

  const TOKEN = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjEyMyIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNjgzNTMyNjY2fQ.fHZpwEpqFHhDgE5fmq1B1_LH2a4cJNxOLxbHUvABYkzZ1BnHdBASq2Jz28CDPkl_CnkMbCUZrY-2z1XbpxOHFQ`;

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["admin-report", category],
    ({ pageParam = 1 }) => {
      return axios({
        method: "get",
        url: `http://www.share42-together.com:8088/api/admin/reports/${category}/${pageParam}/${SIZE}`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    },
    {
      getNextPageParam: (lastPage, allPage) => {
        return allPage.length + 1;
      },
      select: (data) => {
        const newPages = FxJS.pipe(
          FxJS.L.map((d: { data: any }) => d.data.message.content),
          FxJS.L.flatten,
          FxJS.takeAll
        );
        return {
          pages: newPages(data.pages),
          pageParams: data.pageParams,
        };
      },
      cacheTime: 1000 * 300,
      staleTime: 1000 * 300,
    }
  );

  useEffect(() => {
    queryClient.prefetchInfiniteQuery(
      ["admin-report", category],
      ({ pageParam = 1 }) => {
        return axios.get(
          `http://www.share42-together.com:8088/api/admin/reports/${category}/${pageParam}/${SIZE}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );
      }
    );
  }, [category]);

  return cloneElement(children, { data, hasNextPage, fetchNextPage });
}

interface Data {
  data?: any;
  hasNextPage?: boolean;
  fetchNextPage?: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<any, AxiosError>>;
}

// 내용을 구성하는 컴포넌트
function AdminReportContainer({ data, hasNextPage, fetchNextPage }: Data) {
  const divRef = useRef<HTMLDivElement | any>({});
  const { pages } = data;
  console.log(pages);
  const intersetion = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        if (hasNextPage) {
          if (fetchNextPage) {
            fetchNextPage();
          }
        }
      }
    });
  });

  useEffect(() => {
    if (pages.length && divRef?.current) {
      const lastIndex = pages?.length - 1;
      intersetion.observe(divRef?.current[lastIndex]);
    }
  }, [pages]);

  return (
    <>
      {pages.length ? (
        pages?.map((page: any, index: number) => {
          const {
            lockerLockerStationSigungu: si,
            lockerLockerStationDong: dong,
            accountNickname,
            regDt,
            content,
            title,
          } = page;

          const date = regDt.split("T")[0];

          return (
            <div
              css={contentStyle}
              key={index}
              ref={(ref) => {
                return (divRef.current[index] = ref);
              }}
            >
              <img src={testObject} alt="test" className="img" />
              <div className="text">
                <p>{title}</p>
                <p>{content}</p>
                <p>{`${accountNickname} · ${date}`}</p>
                <p>{`${si} · ${dong}`}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div css={emptyBox}>
          <p>리스트가 없어요</p>
          <img src={pinkBox} alt="빈 리스트" />
        </div>
      )}
    </>
  );
}

// 에러시 생성되는 컴포넌트
function ErrorMessage() {
  const { reset } = useQueryErrorResetBoundary();

  const queryClient = useQueryClient();
  const refetch = () => {
    return queryClient.refetchQueries(["admin-report"]);
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
}

function AdminReportContent() {
  return (
    <>
      <ErrorBoundary fallback={ErrorMessage}>
        <Suspense fallback={<Loading />}>
          <AdminReportFatcher>
            <AdminReportContainer />
          </AdminReportFatcher>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default AdminReportContent;
