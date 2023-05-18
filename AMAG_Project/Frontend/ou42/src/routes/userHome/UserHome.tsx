/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */

import {
  cloneElement,
  memo,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AiOutlineHeart, AiTwotoneHeart, AiOutlineEye } from "react-icons/ai";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import axios from "axios";

import { useBranchChoiceStore } from "../../components/map/store/useBranchChoiceStore";
import UserHomeSpeedDial from "../../components/user/UserHomeSpeedDial";
import * as userHomeStyle from "../../components/user/UserHomeStyle";
import { ErrorMessage } from "../../components/ErrorMessage";
import ErrorBoundary from "../../components/ErrorBoundary";
import BottomMenuBar from "../../components/BottomMenuBar";
import { useGetUserToken } from "../../hooks/useGetToken";
import { L, pipe, takeAll } from "./../../custom/FxJS";
import DropDown from "../../components/UI/DropDown";
import Loading from "../../components/Loading";
import pinkBox from "../../assets/pinkBox.png";
import homeStore from "../../store/homeStore";
import { useMutation } from "react-query";

interface Props {
  fetchNextPage: any;
  data: any;
  hasNextPage: boolean;
  refetch: any;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface Data {
  category: string;
  content: string;
  hits: number;
  id: number;
  img: string;
  likeCount: null | number;
  name: string;
  nickname: string;
  sharePrice: number;
  shareStatus: number;
  uptDt: string;
  userId: string;
  likeCheck: null | number;
}

// intersaction 옵션
const intersectionOptions = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 0.5,
};

// API_URL
const API_URL = `https://www.share42-together.com/api/user/share/share-articles/search`;

// 데이터 fetch 컴포넌트
function UserHomeFetcher({
  children,
  sortNum,
}: {
  children: React.PropsWithChildren<ReactJSXElement>;
  sortNum: number;
}) {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const { search, setSearch } = homeStore();
  const TOKEN = useGetUserToken();
  const queryClient = useQueryClient();

  // 현재 위치를 받는 API 함수
  const locationAPI = () => {
    return axios({
      method: "get",
      url: `https://www.share42-together.com/api/common/address/reverse-geo/${location.latitude}/${location.longitude}`,
    });
  };

  // 현재 위치 받는 query
  const { data: address } = useQuery(["get-current-location"], locationAPI, {
    select: (data) => {
      if (data.data.message) {
        const { region_2depth_name, region_3depth_name } = data.data.message;
        return [region_2depth_name, region_3depth_name];
      }
    },

    onSuccess: (data) => {
      if (data?.length) {
        // infinityquery 함수
        const getListFnc = ({ pageParam = 1 }) => {
          return axios({
            method: "get",
            url: `${API_URL}`,
            params: {
              page: pageParam,
              size: 8,
              orderStandard: sortNum,
              sigungu: data[0],
              dong: data[1],
              query: search,
              lat: location.latitude,
              lng: location.longitude,
            },
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          });
        };

        queryClient.prefetchInfiniteQuery(["get-object-list"], getListFnc);
      }
    },
  });

  // infinityquery 함수
  const getListFnc = ({ pageParam = 1 }) => {
    return axios({
      method: "get",
      url: `${API_URL}`,
      params: {
        page: pageParam,
        size: 8,
        orderStandard: sortNum,
        sigungu: address?.length ? address[0] : "",
        dong: address?.length ? address[1] : "",
        query: search,
        lat: location.latitude,
        lng: location.longitude,
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  };

  // 공유글 데이터 불러오는 infinity query
  const { fetchNextPage, data, hasNextPage } = useInfiniteQuery(
    ["get-object-list"],
    getListFnc,
    {
      getNextPageParam: (lastPage, allPage) => {
        console.log(allPage)
        if (allPage[0].data.message.article.totalPages > allPage.length) {
          return allPage.length + 1;
        }
      },
      select: (data) => {
        const newData = pipe(L.map, L.flatten, takeAll);
        let recommendation = [];
        if (data.pages.length) {
          recommendation = data.pages[0].data.message.CFRecommendation;
        }
        return {
          pages: recommendation?.length
            ? [
                ...recommendation,
                ...newData(
                  (arr: any) => arr.data.message.article.content,
                  data.pages
                ),
              ]
            : [
                ...newData(
                  (arr: any) => arr.data.message.article.content,
                  data.pages
                ),
              ],
          pageParams: data.pageParams,
        };
      },
      enabled: !!address?.length,
    }
  );

  useEffect(() => {
    if (location.latitude && location.longitude && address) {
      // infinityquery 함수
      const getListFnc = ({ pageParam = 1 }) => {
        return axios({
          method: "get",
          url: `${API_URL}`,
          params: {
            page: pageParam,
            size: 8,
            orderStandard: sortNum,
            sigungu: address[0],
            dong: address[1],
            query: search,
            lat: location.latitude,
            lng: location.longitude,
          },
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
      };

      queryClient.prefetchInfiniteQuery(["get-object-list"], getListFnc);
    }
  }, [sortNum]);

  // 현재 좌표를 받음
  useLayoutEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (props) => {
          const API = () => {
            return axios({
              method: "get",
              url: `https://www.share42-together.com/api/common/address/reverse-geo/${props.coords.latitude}/${props.coords.longitude}`,
            });
          };

          queryClient.prefetchQuery(["get-current-location"], API);
          setLocation((location) => {
            return {
              latitude: props.coords.latitude,
              longitude: props.coords.longitude,
            };
          });
        },
        null,
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    }
  }, []);

  return cloneElement(children, { fetchNextPage, data, hasNextPage });
}

// 컨텐츠를 보여주는 컴포넌트
function UserHomeList(props: Partial<Props>) {
  const { fetchNextPage, data, hasNextPage } = props;
  const { setBranchChoice } = useBranchChoiceStore();
  const queryClient = useQueryClient();
  const divRef = useRef<HTMLDivElement | any>({});
  const ImgUrl = process.env.REACT_APP_IMAGE_URL;
  const TOKEN = useGetUserToken();

  const { mutate: setLike } = useMutation(
    (id) => {
      return axios({
        method: "post",
        url: `https://www.share42-together.com/api/user/share/share-articles/like/${id}`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["get-object-list"], { exact: true });
      },
    }
  );

  const { mutate: setUnLike } = useMutation(
    (id) => {
      return axios({
        method: "post",
        url: `https://www.share42-together.com/api/user/share/share-articles/unlike/${id}`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["get-object-list"], { exact: true });
      },
    }
  );

  // 생성된 객체 중 마지막 객체가 인식되면 다시 query를 호출한다.
  const intersection = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    });
  }, intersectionOptions);

  // data가 변경될 떄마다 새로운 요소를 감시한다.
  useEffect(() => {
    if (divRef?.current && data?.pages?.length) {
      const lastIndex = data?.pages?.length - 1;
      intersection.observe(divRef?.current[lastIndex]);
    }
  }, [data]);

  // 좋아요 버튼 누름
  const like = (id: any, likeCheck: null | number) => {
    if (likeCheck) {
      setUnLike(id);
    } else {
      setLike(id);
    }
  };

  useEffect(() => {
    setBranchChoice({ name: "", id: null });
  }, []);

  console.log(data)

  return (
    <>
      {data?.pages.length ? (
        data?.pages.map((data: Data, index: number) => {
          const {
            category,
            content,
            hits,
            img,
            likeCount,
            sharePrice,
            uptDt,
            likeCheck,
            id,
          } = data;
          const date = new Date();
          let time = "";

          const YEAR = date.getFullYear();
          const MONTH = date.getMonth() + 1;
          const DAY = date.getDate();
          const HOUR = date.getHours();
          const MINUTES = date.getMinutes();

          const [uptYear, uptTime] = uptDt.split(".")[0].split("T");

          const UPTYEAR = +uptYear.split("-")[0];
          const UPTMONTH = +uptYear.split("-")[1];
          const UPTDAY = +uptYear.split("-")[2];
          const UPTHOUR = +uptTime.split(":")[0];
          const UPTMINUTES = +uptTime.split(":")[1];

          if (UPTYEAR < YEAR) {
            time = `${YEAR - UPTYEAR}년전 `;
          } else {
            if (UPTMONTH < MONTH) {
              time = `${MONTH - UPTMONTH}달전`;
            } else {
              if (UPTDAY < DAY) {
                time = `${DAY - UPTDAY}일전`;
              } else {
                if (UPTHOUR < HOUR) {
                  time = `${HOUR - UPTHOUR}시간전`;
                } else {
                  if (UPTMINUTES < MINUTES) {
                    time = `${MINUTES - UPTMINUTES}분전`;
                  } else {
                    time = `방금전`;
                  }
                }
              }
            }
          }

          return (
            <div
              className="item"
              key={index}
              ref={(ref) => {
                return (divRef.current[index] = ref);
              }}
            >
              {likeCheck ? (
                <div className="img-icon">
                  <AiTwotoneHeart
                    className="redHeart"
                    size="30"
                    onClick={() => like(id, likeCheck)}
                  />
                </div>
              ) : (
                <div className="img-icon">
                  <AiOutlineHeart
                    className="blankHeart"
                    style={{ fill: "black" }}
                    size="30"
                    onClick={() => like(id, likeCheck)}
                  />
                </div>
              )}
              <img src={`${ImgUrl}${img}`} alt="test" className="img" />

              <p>{`${sharePrice.toLocaleString()}원`}</p>
              <p>{`${
                content.length >= 10 ? `${content.slice(0, 10)}...` : content
              }`}</p>
              {/* <p>서울 · 2분전</p> */}
              <p>{`${category} · ${time}`}</p>

              <div className="icon">
                <span className="eye">
                  <AiOutlineEye />
                  <span>{hits}</span>
                </span>

                <div className="heart">
                  <AiOutlineHeart />
                  <span>{likeCount ?? 0}</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div css={userHomeStyle.img}>
          <p>빈 리스트 입니다</p>
          <img src={pinkBox} alt="blank" />
        </div>
      )}
    </>
  );
}

// 상위 컴포넌트
const category = ["최신순", "가격순", "조회수"];

function UserHome() {
  const [value, setValue] = useState<string>("");
  const [sortNum, setSortNum] = useState<number>(0);

  useEffect(() => {
    // select box value
    if (value === "최신순") {
      setSortNum(0);
    } else if (value === "가격순") {
      setSortNum(1);
    } else if (value === "조회수") {
      setSortNum(2);
    }
  }, [value]);

  return (
    <>
      <div css={userHomeStyle.content(value)} id="scrollArea">
        {/* 드롭다운 */}
        <div className="sort-bar">
          <DropDown data={category} setValue={setValue} content={"최신순"} />
        </div>
        {/* 스피드 다이얼 */}
        <div className="speed-dial">
          <UserHomeSpeedDial />
        </div>
        {/* 컨텐츠 */}
        <div className="container">
          <ErrorBoundary fallback={ErrorMessage}>
            <Suspense fallback={<Loading />}>
              <MemoUserHomeFetcher sortNum={sortNum}>
                <MemoUserHomeList />
              </MemoUserHomeFetcher>
            </Suspense>
          </ErrorBoundary>
        </div>
        <BottomMenuBar />
      </div>
    </>
  );
}

const MemoUserHomeList = memo(UserHomeList);
const MemoUserHomeFetcher = memo(UserHomeFetcher);

export default UserHome;
