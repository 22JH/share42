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
  const [title, setTitle] = useState<string>(location?.state?.data?.name ? location?.state?.data?.name : "");
  const [price, setPrice] = useState<string>(location?.state?.data?.sharePrice ? location?.state?.data?.sharePrice : "");
  const [sharePrice, setSharePrice] = useState<string>(location?.state?.data?.price ? location?.state?.data?.price : "");
  const [content, setContent] = useState<string>(location?.state?.data?.content ? location?.state?.data?.content : "");
  const [isFull, setIsFull] = useState<boolean>(false);
  const { branchChoice, setBranchChoice } = useBranchChoiceStore();

  const formData = useMemo(() => new FormData(), []);

  useEffect(() => {
    if (preview) {
      formData.append("imgFile", preview);
    }
    formData.append("name", title);
    formData.append("sharePrice", String(price));
    formData.append("price", String(sharePrice));
    formData.append(
      "category",
      location?.state?.data?.category
        ? location?.state?.data?.category
        : location?.state?.category
    );
    formData.append("content", content);
    if (location?.state?.editStatus !== true) {
      formData.append("lockerStationId", String(branchChoice?.id));
    }
    if (
      preview &&
      title &&
      price &&
      sharePrice &&
      location.state.category &&
      content &&
      branchChoice.id
    ) {
      setIsFull(true);
    }
  }, [
    preview,
    title,
    price,
    location.state.category,
    content,
    branchChoice,
    formData,
  ]);

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
    if (location?.state?.editStatus === true) {
      console.log(location?.state?.editStatus)
      await fetch(
        `https://www.share42-together.com/api/user/share/share-articles/${location?.state?.id}`,
        {
          method: "PATCH",
          body: formData,
          headers : {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        if (data.status === 200) {
          swal("변경 완료", "게시물 내용 변경이 완료되었습니다.", "success");
          navigate(`/user/share-post/${location?.state?.id}`);
        } else {
          swal("변경 실패", "게시물 내용 변경에 실패하였습니다.", "error");
        }
      })
      .catch((e) => {
        console.log(e)
        swal("서버 오류", "서버 오류가 발생했습니다.", "error");
      })
    } else {
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
        return response.json();
      })
      .then((data) => {
        if (data.status === 200) {
          swal("등록 완료", "게시물 등록이 완료되었습니다.", "success");
          navigate("/home");
        } else {
          swal("등록 실패", "게시물 등록에 실패하였습니다.", "error");
        }
      })
      .catch((e) => {
        setBranchChoice({ name: "", id: null });
        console.log(e)
        swal("서버 오류", "서버 오류가 발생했습니다.", "error");
      });
    }
  };

  useEffect(() => {
    for (let i of formData) {
      console.log(i);
    }
  }, [
    preview,
    title,
    price,
    location.state.category,
    content,
    branchChoice,
    formData,
  ]);

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
          <UserShareCategory
            selectValue={
              location?.state?.data?.category
                ? location?.state?.data?.category
                : location?.state?.category
            }
          />
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
          {location?.state?.editStatus ? null : <UserShareChoiceName
            handleShareMapNavigate={handleShareMapNavigate}
          />}
          {location?.state?.editStatus === true ?
            <button
              style={{
                position: "absolute",
                bottom: "0px",
                width: "100%",
                height: "6vh",
                backgroundColor: "#FFABAB",
                color: "#D14D72",
                fontSize: "1.5rem",
                fontWeight: "900",
                border: "none",
              }}
              type="submit"
              onClick={handleSubmit}
            >
              완료
            </button>
          :
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
          </button>}
        </>
      )}
    </section>
  );
};

export default UserShareReg;
