/** @jsxImportSource @emotion/react */

import { useEffect, useMemo, useState } from "react";
import UserShareCategory from "../../components/share/UserShareCategory";
import UserShareContent from "../../components/share/UserShareContent";
import UserShareImg from "../../components/share/UserShareImg";
import UserShareInput from "../../components/share/UserShareInput";
import UserShareChoiceName from "../../components/share/UserShareChoiceName";
import { useBranchChoiceStore } from 
"../../components/map/store/useBranchChoiceStore";
import { useShareDataStore } from 
"../../components/map/store/useShareDataStore";
import UserShareMap from "../../components/share/UserShareMap";

const UserShareReg = () => {
  ///////// 제일 중요한 키포인트는 NavBar이다. 일단 누군가 완성을 해야 진행이 된다고 생각한다.
  //// 완료버튼을 누르면 formData로 보내줘야함, 그 대신 formData에 모든 내용을 담아서 전달해야함.
  //// 일단 preview에 담겨있는 File을 어떻게 formData에 담아야할지 정해야함.

  // 아예 상태관리를 통해서 화면 구분 짓기
  const [isOpenMap, setIsOpenMap] = useState<null | boolean>(null);
  const [preview, setPreview] = useState<null | File>(null);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { branchChoice } = useBranchChoiceStore.getState();
  const { shareData, setShareData } = useShareDataStore();

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
  }, [
    preview,
    title,
    price,
    category,
    content,
    branchChoice,
    setShareData,
    formData,
  ]);

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
  }, [shareData]);

  return (
    <div
      style={{
        overflow: "hidden",
      }}
    >
      {isOpenMap ? (
        <div>
          <UserShareMap setIsOpenMap={setIsOpenMap} />
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
