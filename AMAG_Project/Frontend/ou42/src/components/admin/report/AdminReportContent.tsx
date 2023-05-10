/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

import { cloneElement, memo, Suspense, useEffect, useRef } from "react";
import {
  useInfiniteQuery,
  InfiniteQueryObserverResult,
  FetchNextPageOptions,
  useQueryClient,
} from "react-query";
import axios, { AxiosError } from "axios";

import testObject from "../../../assets/testObject.jpg";
import AdminModalContent from "../AdminModalContent";
import adminStore from "../../../store/adminStore";
import pinkBox from "../../../assets/pinkBox.png";
import ErrorBoundary from "../../ErrorBoundary";
import * as FxJS from "../../../custom/FxJS";
import Loading from "../../Loading";
import { ErrorMessage } from "../../ErrorMessage";

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

export const dialog = css`
  border: 0;
  border-radius: 20px;
  animation-name: show;
  animation-duration: 0.5s;
  outline: none;

  background-color: #fffbfb;

  &::backdrop {
    background-color: #969696;
    opacity: 0.5;
  }

  @keyframes show {
    0% {
      transform: translate(0, 800px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;

interface Data {
  data?: any;
  hasNextPage?: boolean;
  fetchNextPage?: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<any, AxiosError>>;
}

export interface Page {
  accountNickname: string;
  category: number;
  content: string;
  id: number;
  img: string;
  lockerLockerStationDong: string;
  lockerLockerStationSido: string;
  lockerLockerStationSigungu: string;
  regDt: string;
  title: string;
}

const SIZE = 8;

// api 받는 컴포넌트
function AdminReportFatcher(props: {
  children: React.PropsWithChildren<ReactJSXElement>;
}) {
  const { children } = props;
  const { category } = adminStore();
  const queryClient = useQueryClient();

  const TOKEN = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjEyMyIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNjgzNzA0NDE5fQ.PFE9LDgl1MysEiOxFWZxsBC1D7xvZsCSiGSd7iOWy7Hcf-jUlJVoSdexkeZ8zy1EpTTfnRBMgXonLH3e_aWkaA`;

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
        return axios({
          method: "get",
          url: `http://www.share42-together.com:8088/api/admin/reports/${category}/${pageParam}/${SIZE}`,
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
      }
    );
  }, [category]);

  return cloneElement(children, { data, hasNextPage, fetchNextPage });
}

// 내용을 구성하는 컴포넌트
function AdminReportContainer({ data, hasNextPage, fetchNextPage }: Data) {
  const { pages } = data;
  const divRef = useRef<HTMLDivElement | any>({});
  const dialogRef = useRef<HTMLDialogElement>(null);

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
        pages?.map((page: Page, index: number) => {
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
              key={`${index} / ${si} / ${dong} / ${accountNickname} / ${regDt} / ${content} / ${title}`}
            >
              {/* 목록 LIST */}
              <div
                css={contentStyle}
                ref={(ref) => {
                  return (divRef.current[index] = ref);
                }}
                onClick={() => {
                  dialogRef?.current?.showModal();
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

              {/* modal */}
              <dialog ref={dialogRef} css={dialog}>
                <AdminModalContent dialogRef={dialogRef} data={page} />
              </dialog>
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

function AdminReportContent() {
  return (
    <>
      <ErrorBoundary fallback={ErrorMessage}>
        <Suspense fallback={<Loading />}>
          <AdminReportFatcher>
            <MemoizedContainer />
          </AdminReportFatcher>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

const MemoizedContainer = memo(AdminReportContainer);

export default AdminReportContent;
