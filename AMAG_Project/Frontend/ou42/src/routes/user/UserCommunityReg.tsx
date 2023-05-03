/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import TextField from "@mui/material/TextField";

import axios from "axios";
import { useMutation } from 'react-query';
import { useEffect, useState } from "react";
import UserCommunityRegCategory from "../../components/community/UserCommunityRegCategory";
import UserCommunityRegContent from "../../components/community/UserCommunityRegContent";
import UserCommunityRegTitle from "../../components/community/UserCommunityRegTitle";

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
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<string>("");
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

  const postCommunity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // useMutation으로 바꿔야지
    axios({
      method: "POST",
      url:"http://www.share42-together.com:8088/api/user/community/posts",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      },
      data: {
        category,
        title,
        content,
      },
    }).then((res) => console.log(res.data.status))
  };

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
      onSubmit={postCommunity}
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
      <button
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          height: "5vh",
          background: isSubmit ? "#FFABAB" : "#F0F0F0",
          color: isSubmit ? "#D14D72" : "#B2B2B2",
          textAlign: "center",
          lineHeight: "5vh",
          fontSize: "1.2rem",
          fontWeight: "900",
          border: "none",
        }}
        type="submit"
        disabled={isSubmit ? false : true}
      >
        완료
      </button>
    </form>
  );
};

export default UserCommunityReg;
