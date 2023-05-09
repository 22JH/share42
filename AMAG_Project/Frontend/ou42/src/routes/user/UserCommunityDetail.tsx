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
import { getTimeAgo } from "../../utils/getTimeAgo";

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
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;

  const PAGE = 1;
  const SIZE = 5;
  const { id } = useParams();
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
          Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
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
