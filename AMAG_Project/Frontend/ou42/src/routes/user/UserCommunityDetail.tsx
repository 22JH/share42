/* eslint-disable max-len */
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import UserCommunityDetailInfo from "../../components/community/UserCommunityDetailInfo";
import UserCommunityDetailContents from "../../components/community/UserCommunityDetailContents";

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

const UserCommunityDetail = () => {
  // const PAGE = 1;
  // const SIZE = 5;
  // const { id } = useParams();
  // const accessToken = localStorage.getItem("token");

  // const Detail_API = (id: string | undefined) => {
  //   return `http://www.share42-together.com:8088/api/user/community/posts/${id}/${PAGE}/${SIZE}`;
  // };

  // const { data } = useQuery(["getCommunityDetail", id], async () => {
  //   const response = await axios({
  //     method: "get",
  //     url: Detail_API(id),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bear ${accessToken}`,
  //     },
  //   });
  //   console.log(response.data.message);
  //   return response.data.message;
  // });

  return (
    <div>
      <div
        style={{
          height: "7vh",
          padding: "0.5rem 1rem",
          borderBottom: "1px solid #adadad",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></div>
      {/* 아이디, 동네, 시간, 카테코리, 조회수 */}
      {/* <UserCommunityDetailInfo
        data={data}
        getTimeAgo={getTimeAgo}
      /> */}
      {/* 제목, 내용, 댓글 수 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          minHeight: "50vh",
          borderBottom: "1px solid #adadad",
          padding: "1rem 2rem",
        }}
      ></div>
      {/* <UserCommunityDetailContents
        data={data}
      /> */}
      {/* 댓글 - 유저 이미지, 유저 아이디, 댓글 내용, 신고링크, 시간 */}
      <div></div>
      {/* 댓글입력창, 버튼 */}
      <div></div>
    </div>
  );
};

export default UserCommunityDetail;
