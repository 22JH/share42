/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useMemo, useState } from "react";
import UserShareCategory from "../../components/users/UserShareCategory";
import UserShareContent from "../../components/users/UserShareContent";
import UserShareImg from "../../components/users/UserShareImg";
import UserShareInput from "../../components/users/UserShareInput";
import { useNavigate } from "react-router-dom";
import UserShareChoiceName from "../../components/users/UserShareChoiceName";
import { useStore } from "../../components/map/store/useStore";
import UserShareMap from "./UserShareMap";

export const CategorySelectStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const UserShareContentStyle = css`
  display: flex;
  height: auto;
  width: 75%;
  flex-direction: column;

  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 3px solid #d14d72;
  }

  & label.Mui-focused {
    color: #d14d72;
  }
`;

const UserShareReg = () => {
  ///////// 제일 중요한 키포인트는 NavBar이다. 일단 누군가 완성을 해야 진행이 된다고 생각한다.
  //// 완료버튼을 누르면 formData로 보내줘야함, 그 대신 formData에 모든 내용을 담아서 전달해야함.
  //// 일단 preview에 담겨있는 File을 어떻게 formData에 담아야할지 정해야함.

  // 아예 상태관리를 통해서 화면 구분 짓기
  const { isOpenMap, setIsOpenMap } = useStore();
  const { preview, setPreview } = useStore();
  const { title, setTitle } = useStore();
  const { price, setPrice } = useStore();
  const { category, setCategory } = useStore();
  const { content, setContent } = useStore();
  const { branchChoice, setBranchChoice } = useStore();
  const { shareData, setShareData } = useStore();
  
  const formData = useMemo(() => new FormData(), []);

  // 클릭과 동시에 담아 볼 생각도 해봄 => 요거는 물어봐야할듯
  useEffect(() => {
    if (preview) {
      formData.append("preview", preview);
    }
    formData.set("title", title);
    formData.set("price", price);
    formData.set("category", category);
    formData.set("content", content);
    formData.set("branchChoice", branchChoice);
    setShareData(formData);
  }, [preview, title, price, category, content, branchChoice, setShareData, formData]);

  const options = [
    { value: "기본", category: "카테고리를 선택해주세요" },
    { value: "공구", category: "공구" },
    { value: "생활/주방", category: "생활/주방" },
    { value: "취미/게임/음반", category: "취미/게임/음반" },
    { value: "스포츠/레저", category: "스포츠/레저" },
    { value: "디지털기기", category: "디지털기기" },
  ];

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setPreview(e.target.files[0]);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setPreview(null);
  };

  const handleShareTitle = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setTitle(e?.target?.value);
  };

  const handleSharePrice = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setPrice(e?.target?.value);
  };

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (e.target as HTMLSelectElement).value;
    if (category !== value) {
      setCategory(value);
    }
  };

  const handleShareArea = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setContent(e?.target?.value);
  };

  const handleShareMapNavigate = () => {
    setIsOpenMap(true);
  };

  useEffect(() => {
    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }
  }, [shareData])

  return (
    <div
      style={{
        overflow:'hidden'
      }}
    >
      {isOpenMap ? (
        <div>
          <UserShareMap />
        </div>
      ) : (
        <div>
          <UserShareImg
            preview={preview}
            handleFileInputChange={handleFileInputChange}
            handleRemoveImage={handleRemoveImage}
          />
          <UserShareInput
            value={title}
            text={"제목"}
            handleShareInput={handleShareTitle}
          />
          <UserShareInput
            value={price}
            text={"대여금액"}
            handleShareInput={handleSharePrice}
          />
          <UserShareCategory
            selectValue={category}
            options={options}
            handleSelectCategory={handleSelectCategory}
          />
          <UserShareContent
            content={content}
            handleShareArea={handleShareArea}
          />
          <UserShareChoiceName
            handleShareMapNavigate={handleShareMapNavigate}
          />
        </div>
      )}
    </div>
  );
};

export default UserShareReg;
