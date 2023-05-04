/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import UserCommunityDetailInfo from "../../components/community/UserCommunityDetailInfo";
import UserCommunityDetailContents from "../../components/community/UserCommunityDetailContents";
import UserCommunityCommentList from "../../components/community/UserCommunityCommentList";
import UserCommunityCommentForm from "../../components/community/UserCommunityCommentForm";
import TextField from "@mui/material/TextField";

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

export interface commentType {
  content: string;
  accountImg: string;
  accountNickname: string;
  uptDt: string;
  id: string;
}

export const StyleCommentInput = css`
  & > label {
    font-weight: bold;
  }
`;

const UserCommunityDetail = () => {
  const PAGE = 1;
  const SIZE = 5;
  const { id } = useParams();
  const accessToken = localStorage.getItem("token");
  const [comment, setComment] = useState<string>("");
  const [postcomment, setPostComment] = useState<string>("");

  const Detail_API = (id: string | undefined) => {
    return `http://www.share42-together.com:8088/api/user/community/posts/${id}/${PAGE}/${SIZE}`;
  };

  const Post_Comment_API = () => {
    return `http://www.share42-together.com:8088/api/user/community/comments`;
  };

  const { data, refetch } = useQuery(
    ["getCommunityDetail", id],
    async () => {
      const response = await axios({
        method: "get",
        url: Detail_API(id),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.message;
    },
    {
      suspense: false,
    }
  );

  const handleCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    setComment(value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string | undefined
  ) => {
    e.preventDefault();
    const response = await axios({
      method: "POST",
      url: Post_Comment_API(),
      data: {
        communityId: Number(id),
        content: comment,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data.status === 200) {
      setPostComment("");
      refetch();
    }
  };

  return (
    <>
      {/* 아이디, 동네, 시간, 카테코리, 조회수 */}
      <UserCommunityDetailInfo data={data} getTimeAgo={getTimeAgo} />
      {/* 제목, 내용, 댓글 수 */}
      <UserCommunityDetailContents data={data} />
      {/* 댓글 - 유저 이미지, 유저 아이디, 댓글 내용, 신고링크, 시간 */}
      <UserCommunityCommentList
        data={data}
        getTimeAgo={getTimeAgo}
        setComment={setComment}
        comment={comment}
        refetch={refetch}
      />
      {/* 댓글입력창, 버튼 */}
      <UserCommunityCommentForm
        handleSubmit={handleSubmit}
        handleCommentInput={handleCommentInput}
        id={id}
        comment={postcomment}
      />
    </>
  );
};

export default UserCommunityDetail;
