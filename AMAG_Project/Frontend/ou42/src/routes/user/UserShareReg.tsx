/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */

import React, { useEffect, useMemo, useState } from "react";
import UserShareContent from "../../components/share/UserShareContent";
import UserShareImg from "../../components/share/UserShareImg";
import UserShareInput from "../../components/share/UserShareInput";
import UserShareChoiceName from "../../components/share/UserShareChoiceName";
import { useBranchChoiceStore } from "../../components/map/store/useBranchChoiceStore";
import UserShareMap from "../../components/share/UserShareMap";
import shareIsOpenStore from "../../store/shareIsOpenStore";
import UserSharePrice from "../../components/share/UserSharePrice";
import { useLocation, useNavigate } from "react-router-dom";
import UserShareCategory from "../../components/share/UserShareCategory";
import swal from "sweetalert";

const UserShareReg = () => {
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;
  const location = useLocation();
  const navigate = useNavigate();

  // 아예 상태관리를 통해서 화면 구분 짓기
  const { isOpenShareMap, setIsOpenShareMap } = shareIsOpenStore();
  const [preview, setPreview] = useState<null | File>(null);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [sharePrice, setSharePrice] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isFull, setIsFull] = useState<boolean>(false);
  const { branchChoice, setBranchChoice } = useBranchChoiceStore();

  const formData = useMemo(() => new FormData(), []);

  useEffect(() => {
    if (preview) {
      formData.append("imgFile", preview);
    }
    formData.append("name", title);
    formData.append("price", price);
    formData.append("sharePrice", sharePrice);
    formData.append("category", location.state);
    formData.append("content", content);
    formData.append("lockerStationId", String(branchChoice.id));
    console.log(branchChoice.name);
    if (
      preview &&
      title &&
      price &&
      sharePrice &&
      location.state &&
      content &&
      branchChoice.id
    ) {
      setIsFull(true);
    }
  }, [preview, title, price, location.state, content, branchChoice, formData]);

  const handleShareTitle = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setTitle(e?.target?.value);
  };

  const handlePrice = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setPrice(e?.target?.value);
  };

  const handleSharePrice = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setSharePrice(e?.target?.value);
  };

  const handleShareArea = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setContent(e?.target?.value);
  };

  const handleShareMapNavigate = () => {
    setIsOpenShareMap(true);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(
      `https://www.share42-together.com/api/user/share/share-articles`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        console.log(data);
        swal("등록이 완료되었습니다", "게시물을 확인해 보세요", "success");
        navigate("/home");
      })
      .catch((e) => {
        console.log(e);
        setBranchChoice({ name: "", id: null });
        swal("등록이 실패하였습니다", "서버 오류가 발생했습니다.", "error");
      });
  };

  useEffect(() => {
    for (let i of formData) {
      console.log(i);
    }
  }, [preview, title, price, location.state, content, branchChoice, formData]);

  return (
    <section
      style={{
        overflow: "hidden",
      }}
    >
      {isOpenShareMap ? (
        <>
          <UserShareMap />
        </>
      ) : (
        <>
          <UserShareCategory selectValue={location.state} />
          <UserShareImg
            preview={preview}
            setPreview={setPreview}
            formData={formData}
          />
          <UserShareInput
            value={title}
            text={"제목"}
            handleShareInput={handleShareTitle}
          />
          <UserSharePrice
            price={price}
            sharePrice={sharePrice}
            handlePrice={handlePrice}
            handleSharePrice={handleSharePrice}
          />
          <UserShareContent
            content={content}
            handleShareArea={handleShareArea}
          />
          <UserShareChoiceName
            handleShareMapNavigate={handleShareMapNavigate}
          />
          <button
            style={{
              position: "absolute",
              bottom: "0px",
              width: "100%",
              height: "6vh",
              backgroundColor: isFull ? "#FFABAB" : "#F0F0F0",
              color: isFull ? "#D14D72" : "#B2B2B2",
              fontSize: "1.5rem",
              fontWeight: "900",
              border: "none",
            }}
            type="submit"
            disabled={!isFull}
            onClick={handleSubmit}
          >
            완료
          </button>
        </>
      )}
    </section>
  );
};

export default UserShareReg;
