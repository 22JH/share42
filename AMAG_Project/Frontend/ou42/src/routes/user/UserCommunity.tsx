/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import communityStore from "../../store/communityStore";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import UserCommunityBtns from "../../components/community/UserCommunityBtns";
import UserCommunityPosts from "../../components/community/UserCommunityPosts";
import UserCommunityBottomBar from "../../components/community/UserCommunityBottomBar";
import { getTimeAgo } from "../../utils/getTimeAgo";

export const UserCommunityBtnStyle = css`
  & > .sort-button-recent,
  & > .sort-button-popular,
  & > .sort-button-news,
  & > .sort-button-need,
  & > .sort-button-share {
    font-size: 0.5rem;
    width: 15vw;
    height: 5vh;
    margin-right: 3vw;
    border-radius: 40%;
    background-color: white;
  }

  & > .sort-button-recent.active,
  & > .sort-button-popular.active,
  & > .sort-button-news.active,
  & > .sort-button-need.active,
  & > .sort-button-share.active {
    background-color: #FFABAB;
    border: none;
    color: #ffffff;
    font-weight: 900;
  }
`;

const PAGE = 1;
const SIZE = 20;

const sortArray = [
  { idx: 0, num: 0, title: "최신순", category: "recent" },
  { idx: 1, num: 1, title: "인기순", category: "popular" },
  { idx: 2, num: 1, title: "소식공유", category: "news" },
  { idx: 3, num: 2, title: "필요해요", category: "need" },
  { idx: 4, num: 3, title: "공유해요", category: "share" },
  { idx: 5, num: 0, title: "모든", category: "all" },
];

const UserCommunity = () => {
  const [recent, setRecent] = useState<boolean>(false);
  const [popular, setPopular] = useState<boolean>(false);
  const [news, setNews] = useState<boolean>(false);
  const [need, setNeed] = useState<boolean>(false);
  const [share, setShare] = useState<boolean>(false);
  const [all, setAll] = useState<boolean>(false);

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
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;

  const SORT_API = (sort: any, category: any) => {
    // eslint-disable-next-line max-len
    return `https://www.share42-together.com/api/user/community/posts/list?page=${PAGE}&size=${SIZE}&sort=${sort}&category=${category.num}`;
  };

  const SEARCH_API = (sort: any, category: any, search: any) => {
    // eslint-disable-next-line max-len
    return `https://www.share42-together.com/api/user/community/posts/list?page=${PAGE}&size=${SIZE}&sort=${sort}&category=${category.num}&search=${search}`;
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
          Authorization: `Bearer ${token}`,
        },
      });
      const { content } = response.data.message;
      return content;
    },
    {
      suspense: false,
    }
  );

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
  };

  useEffect(() => {
    if (sort === 0) {
      setRecent(true);
      setPopular(false);
    } else {
      setRecent(false);
      setPopular(true);
    }

    if (category.idx === 2) {
      setNews(true);
      setNeed(false);
      setShare(false);
      setAll(false);
    } else if (category.idx === 3) {
      setNews(false);
      setNeed(true);
      setShare(false);
      setAll(false);
    } else if (category.idx === 4) {
      setNews(false);
      setNeed(false);
      setShare(true);
      setAll(false);
    } else {
      setNews(false);
      setNeed(false);
      setShare(false);
      setAll(true);
    }
  }, [sort, category.idx]);

  return (
    <>
      <UserCommunityBtns
        sort={sort}
        category={category}
        sortArray={sortArray}
        handleCommunitySort={handleCommunitySort}
        recent={recent}
        popular={popular}
        news={news}
        need={need}
        share={share}
        all={all}
      />
      <UserCommunityPosts data={data} divRef={divRef} getTimeAgo={getTimeAgo} />
      <UserCommunityBottomBar />
    </>
  );
};

export default UserCommunity;
