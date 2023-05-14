/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import axios from "axios";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import UserCommunityRegCategory from "../../components/community/UserCommunityRegCategory";
import UserCommunityRegContent from "../../components/community/UserCommunityRegContent";
import UserCommunityRegTitle from "../../components/community/UserCommunityRegTitle";
import { useLocation, useNavigate } from "react-router";
import UserCommunityRegSubmit from "../../components/community/UserCommunityRegSubmit";
import swal from "sweetalert";

export const CategorySelectStyle = css`
  select {
    width: 85%;
    height: 5vh;
    border-radius: 5px;
    border: #a5a5a5 1px solid;
    outline: 0 none;
    background: none;
    &:focus {
      border: #a5a5a5 1px solid;
    }
    color: #000000;
  }

  & option {
    color: #a5a5a5; /* 바꿀 색상 */
  }
`;

export const CommunityContentStyle = css`
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 3px solid #d14d72;
  }

  & label.Mui-focused {
    color: #d14d72;
  }
`;

const options = [
  { value: "", category: "카테고리를 선택해주세요" },
  { value: "소식공유", category: "소식공유" },
  { value: "필요해요", category: "필요해요" },
  { value: "공유해요", category: "공유해요" },
];

export interface SubmitDataType {
  title: string;
  category: string;
  content: string;
}

const UserCommunityReg = () => {
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const [title, setTitle] = useState<string>(state.data.communityDetail.title ? state.data.communityDetail.title: "");
  const [category, setCategory] = useState<string>(state.data.communityDetail.category ? state.data.communityDetail.category : "");
  const [content, setContent] = useState<string>(state.data.communityDetail.content ? state.data.communityDetail.content: "");
  const [isSubmit, setIsSubmit] = useState<boolean | null>(null);


  const handleCommunityTitle = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (e.target as HTMLSelectElement).value;
    if (category !== value) {
      setCategory(value);
    }
  };

  const handleShareArea = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContent(e?.target?.value);
  };

  const { mutate:communityPost } = useMutation((postData: SubmitDataType) =>
    axios
      .post(
        "https://www.share42-together.com:8088/api/user/community/posts",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if(res.data.status === 200) {
          swal("등록 성공", "게시물 등록이 완료되었습니다.", "success");
        } else {
          swal("등록 실패", "게시물 등록이 실패되었습니다.", "error");
        }
      })
      .then((status) => navigate('/user/community/'))
      .catch((e) => {
        console.log(e)
        swal("서버 오류", "서버 오류로 신청이 실패되었습니다.", "error");
      })
  );

  const { mutate:communityPatch } = useMutation((postData: SubmitDataType) =>
    axios
      .patch(
        `https://www.share42-together.com:8088/api/user/community/posts/${state.id}`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if(res.data.status === 200) {
          swal("변경 성공", "게시물 변경이 완료되었습니다.", "success");
        } else {
          swal("변경 실패", "게시물 변경이 실패되었습니다.", "error");
        }
      })
      .then((status) => navigate(`/user/community/${state.id}`))
      .catch((e) => {
        console.log(e)
        swal("서버 오류", "서버 오류로 신청이 실패되었습니다.", "error");
      })
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.editStatus) {
      communityPatch({
        category,
        title,
        content,
      })
    } else {
      communityPost({
        category,
        title,
        content,
      });
    }
  };

  console.log(state.editStatus)
  console.log(state.data)
  console.log(state.id)

  useEffect(() => {
    if (title !== "" && category !== "" && content !== "") {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [title, category, content]);

  return (
    <form
      style={{
        marginTop: "4vh",
      }}
      onSubmit={handleSubmit}
    >
      <UserCommunityRegTitle
        title={title}
        handleCommunityTitle={handleCommunityTitle}
      />
      {/* 카테고리 */}
      <UserCommunityRegCategory
        category={category}
        options={options}
        handleSelectCategory={handleSelectCategory}
      />
      {/* 내용 */}
      <UserCommunityRegContent
        content={content}
        handleShareArea={handleShareArea}
      />
      {/* 바텀 버튼 */}
      <UserCommunityRegSubmit
        isSubmit={isSubmit}
      />
    </form>
  );
};

export default UserCommunityReg;
