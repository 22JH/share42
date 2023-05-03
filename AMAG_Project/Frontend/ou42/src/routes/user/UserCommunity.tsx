/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState } from "react";
import communityStore from "../../store/communityStore";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import UserCommunityBtns from "../../components/community/UserCommunityBtns";
import UserCommunityPosts from "../../components/community/UserCommunityPosts";
import UserCommunityBottomBar from "../../components/community/UserCommunityBottomBar";

export const UserCommunityBtnStyle = css`
  & > button {
    font-size: 0.5rem;
    width: 15vw;
    height: 3vh;
    margin-right: 3vw;
    border-radius: 40%;
    background-color: white;
  }
`;

const PAGE = 1;
const SIZE = 20;

const UserCommunity = () => {
  const [sort, setSort] = useState<number>(0);
  const [category, setCategory] = useState<{
    idx: number;
    num: number;
    title: string;
  }>({
    idx: 0,
    num: 0,
    title: "모든",
  });
  const { search } = communityStore();
  const divRef = useRef<HTMLDivElement | any>({});
  const queryClient = useQueryClient();

  const SORT_API = (sort: any, category: any) => {
    // eslint-disable-next-line max-len
    return `http://www.share42-together.com:8088/api/user/community/posts/list?page=${PAGE}&size=${SIZE}&sort=${sort}&category=${category.num}`;
  };

  const SEARCH_API = (sort: any, category: any, search: any) => {
    // eslint-disable-next-line max-len
    return `http://www.share42-together.com:8088/api/user/community/posts/list?page=${PAGE}&size=${SIZE}&sort=${sort}&category=${category.num}&search=${search}`;
  };

  const { data } = useQuery(
    ["getCommunity", sort, category, search],
    async () => {
      const response = await axios({
        method: "get",
        url: search
          ? SEARCH_API(sort, category, search)
          : SORT_API(sort, category),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { content } = response.data.message;
      return content;
    }
  );

  const sortArray = [
    { idx: 0, num: 0, title: "최신순" },
    { idx: 1, num: 1, title: "인기순" },
    { idx: 2, num: 1, title: "소식공유" },
    { idx: 3, num: 2, title: "필요해요" },
    { idx: 4, num: 3, title: "공유해요" },
    { idx: 5, num: 0, title: "모든" },
  ];

  // 정렬 요청
  const handleCommunitySort = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const value: string = e?.currentTarget?.value;
    const target = sortArray.filter(function (item) {
      return item.title === value;
    });
    // 정렬
    if (target[0].idx >= 0 && target[0].idx < 2) {
      setSort(target[0].num);
    } else if (target[0].idx >= 2 && target[0].idx < 5) {
      setCategory({
        idx: target[0].idx,
        num: target[0].num,
        title: target[0].title,
      });
    }
    if (category.title === value) {
      setCategory({ idx: 5, num: 0, title: "모든" });
    }
    queryClient.invalidateQueries("community-infinity-scroll");
  };

  // 시간 측정하기
  const getTimeAgo = (timestamp: string) => {
    const now = new Date().getTime();
    const diff = now - new Date(timestamp).getTime();

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;

    if (diff < minute) {
      return "방금 전";
    } else if (diff < hour) {
      return Math.floor(diff / minute) + "분 전";
    } else if (diff < day) {
      return Math.floor(diff / hour) + "시간 전";
    } else if (diff < month) {
      return Math.floor(diff / day) + "일 전";
    } else {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}년 ${month}월 ${day}일`;
    }
  };

  return (
    <>
      <UserCommunityBtns
        sortArray={sortArray}
        handleCommunitySort={handleCommunitySort}
      />
      <UserCommunityPosts data={data} divRef={divRef} getTimeAgo={getTimeAgo} />
      <UserCommunityBottomBar />
    </>
  );
};

export default UserCommunity;
