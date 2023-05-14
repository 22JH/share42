/* eslint-disable max-len */
import avocado from "../../assets/avocado.jpg";
import { FaEllipsisV } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";

export interface UserCommunityCommentListProps {
  data: {
    commentDetailList: {
      content: {
        content: string;
        accountImg: string;
        accountNickname: string;
        uptDt: string;
      }[];
    };
  };
  getTimeAgo: (timestamp: string) => string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  comment: string;
  refetch: any;
}

const UserCommunityCommentList = ({
  data,
  getTimeAgo,
  setComment,
  comment,
  refetch,
}: UserCommunityCommentListProps) => {
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;
  const { userId } = loginObject ? JSON.parse(loginObject) : null;

  // console.log(userId)
  // console.log(data.commentDetailList.content[0].accountUserId)

  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditComment = (commentId: number, content: string) => {
    if (isEdit === false) {
      setIsEdit(!isEdit);
      setEditCommentId(commentId);
    } else if (isEdit === true) {
      setIsEdit(!isEdit);
      setEditCommentId(null);
    }
    setComment(content);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    setComment(value);
  };

  const handleEditSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string | undefined
  ) => {
    e.preventDefault();
    const response = await axios({
      method: "PATCH",
<<<<<<< HEAD
      url: `https://www.share42-together.com:8088/api/user/community/comments/${Number(
=======
      url: `https://www.share42-together.com/api/user/community/comments/${Number(
>>>>>>> origin/feature/FE/user-mypage-api
        id
      )}`,
      data: {
        content: comment,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status) {
      setIsEdit(!isEdit);
      setEditCommentId(null);
      refetch();
    }
  };

  const handleCommentDelete = async (
    e: React.MouseEvent<HTMLSpanElement>,
    id: number
  ) => {
    const response = await axios({
<<<<<<< HEAD
      method: 'DELETE',
      url: `https://www.share42-together.com:8088/api/user/community/comments/${Number(
=======
      method: "DELETE",
      url: `https://www.share42-together.com/api/user/community/comments/${Number(
>>>>>>> origin/feature/FE/user-mypage-api
        id
      )}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === 200) {
      refetch();
    }
  };

  return (
    <div
      style={{
        marginBottom: "10vh",
      }}
    >
      {data?.commentDetailList?.content?.map((item: any, index: number) => (
        <div
          key={index}
          style={{
            width: "calc(100% - 2rem - 2px)",
            minHeight: "12vh",
            borderBottom: "1px solid #adadad",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.7rem 1rem",
          }}
        >
          <div
            style={{
              width: "95%",
              minHeight: "4vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1vh",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "900",
              }}
            >
              {/* {item?.accountUserId} */}
              <img
                style={{
                  width: "3rem",
                  height: "3rem",
                  marginRight: "0.5rem",
                }}
                src={avocado}
                alt="profile"
              />
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  marginRight: "0.5rem",
                }}
              >
                {item?.accountNickname}
              </span>
              {item?.accountUserId === userId ? <>
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginRight: "0.5rem",
                    cursor: "pointer",
                    color: "#adadad",
                    fontSize: "0.8rem",
                  }}
                  onClick={() => handleEditComment(item?.id, item?.content)}
                >
                  수정
                </span>
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginRight: "0.5rem",
                    cursor: "pointer",
                    color: "#adadad",
                    fontSize: "0.8rem",
                  }}
                  onClick={(e) => handleCommentDelete(e, item?.id)}
                >
                  삭제
                </span>
              </> : null}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                }}
              >
                {getTimeAgo(item?.uptDt)}
              </span>
              <FaEllipsisV
                size={25}
                style={{
                  marginLeft: "1rem",
                }}
              />
            </div>
          </div>
          <div
            style={{
              width: "90%",
              minHeight: "4vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {isEdit && editCommentId === item?.id ? (
              <form onSubmit={(e) => handleEditSubmit(e, item?.id)}>
                <input
                  type="text"
                  onChange={handleEditChange}
                  value={comment}
                />
                <button type="submit">수정하기</button>
              </form>
            ) : (
              <span
                style={{
                  display: "block",
                  minHeight: "3vh",
                  width: "100%",
                  overflow: "auto",
                  paddingBottom: "1vh",
                }}
              >
                {item?.content}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCommunityCommentList;
