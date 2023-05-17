/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import cameraDefault from "../../assets/cameraDefault.png";
import swal from "sweetalert";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

const ReturnSelectStyle = css`
  select {
    width: 92%;
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

const RETURN_LIST_API = () => {
  return `https://www.share42-together.com:8088/api/common/locker/detail/1/20/1`;
};

const RETURN_SUBMIT_API = () => {
  return `https://www.share42-together.com:8088/api/user/share/return`;
};

const RETURN_DELETE_API = (id: string) => {
  return `https://www.share42-together.com:8088/api/user/share/return/cancel/${id}`;
};

const UserReturn = () => {
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;
  // const { userId } = loginObject ? JSON.parse(loginObject) : null;

  // lockerStationId
  const { state } = useLocation();
  // shareArticleId
  const [selectId, setSelectId] = useState<string>("");
  const [preview, setPreview] = useState<null | File>(null);
  const [isBtn, setIsBtn] = useState<boolean>(false);
  const [returnStatus, setReturnStatus] = useState<string | number>("");
  const [deleteBtn, setDeleteBtn] = useState<boolean>(false);

  const formData = useMemo(() => new FormData(), []);

  const handleSelectProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectId(value);
  };

  const { data } = useQuery(
    ["getReturnCategory"],
    async () => {
      try {
        const res = await axios({
          method: "GET",
          url: RETURN_LIST_API(),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const options = [
          {
            shareArticleId: null,
            error: false,
            lockerNumber: 0,
            shareArticleSharePrice: null,
            shareArticleShareStatus: 7,
            shareArticleAccountNickname: "반납할 물건을 선택해주세요.",
            shareArticleName: null,
          },
        ];
        res.data.message.lockerList.forEach((option: any) => {
          options.push(option);
        });
        return options;
      } catch (e) {
        console.log(e);
      }
    },
    {
      suspense: false,
    }
  );

  useEffect(() => {
    const ans = data?.find((item) => item.shareArticleId === Number(selectId));
    setReturnStatus(String(ans?.shareArticleShareStatus));
    if (String(ans?.shareArticleShareStatus) === "3") {
      setDeleteBtn(true);
    }
  }, [data, selectId]);

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files != null && files.length > 0) {
      setPreview(files[0]);
    }
  };

  // formData에 담기
  useEffect(() => {
    if (preview) {
      formData.append("imgFile", preview);
      formData.append("lockerStationId", state);
      formData.append("selectId", selectId);
    }

    if (preview && state && selectId && returnStatus === "2") {
      setIsBtn(true);
    }
  }, [preview, state, selectId, formData, returnStatus]);

  // formData 확인
  useEffect(() => {
    for (let i of formData) {
      console.log(i);
    }
  }, [formData, preview, state, selectId]);

  // 반납 신청하기
  const handleSubmit = async () => {
    await fetch(RETURN_SUBMIT_API(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setDeleteBtn(true);
          swal("신청 성공", "반납 신청이 완료되었습니다.", "success");
        } else {
          swal("신청 실패", "반납 신청이 실패되었습니다.", "error");
        }
      })
      .catch((e) => {
        console.log(e);
        swal("서버 오류", "서버 오류로 신청이 실패되었습니다.", "error");
      });
  };

  // 반납 취소하기
  const handleCancel = async (selectId: string) => {
    await axios({
      method: "POST",
      url: RETURN_DELETE_API(selectId),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setDeleteBtn(false);
          swal("취소 성공", "반납 취소가 완료되었습니다.", "success");
        } else {
          swal("취소 실패", "반납 취소가 실패되었습니다.", "error");
        }
        return res.data.message;
      })
      .catch((e) => {
        console.log(e);
        swal("서버 오류", "서버 오류로 신청이 실패되었습니다.", "error");
      });
  };

  return (
    <>
      <div
        style={{
          height: "6vh",
        }}
      ></div>
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2vh",
        }}
        css={ReturnSelectStyle}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            width: "90%",
            marginBottom: "1vh",
            fontSize: "1.2rem",
            fontWeight: "900",
            textAlign: "left",
          }}
        >
          현재 공유하고 있는 물건 리스트
        </div>
        <select
          style={{
            marginBottom: "2vh",
          }}
          value={selectId}
          onChange={handleSelectProduct}
        >
          {data?.map((option: any, index: number) => (
            <option key={index} value={option.shareArticleId}>
              {option.shareArticleAccountNickname} {option.shareArticleName}{" "}
              {option.shareArticleSharePrice
                ? option.shareArticleSharePrice.toLocaleString()
                : null}
            </option>
          ))}
        </select>
        <div
          style={{
            width: "90%",
            marginBottom: "1vh",
            fontSize: "1.2rem",
            fontWeight: "900",
            textAlign: "left",
          }}
        ></div>
        <div
          style={{
            width: "100vw",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3vh",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            htmlFor="camera"
          >
            {preview ? (
              <div
                style={{
                  position: "relative",
                }}
              >
                <img
                  src={URL.createObjectURL(preview)}
                  style={{
                    width: "370px",
                    height: "370px",
                    borderRadius: "20px",
                  }}
                  alt="Thumb"
                />
              </div>
            ) : (
              <img
                style={{
                  width: "370px",
                  height: "370px",
                  borderRadius: "20px",
                }}
                src={cameraDefault}
                alt="기본이미지"
              />
            )}
          </label>
          <input
            id="camera"
            name="camera"
            type="file"
            accept="image/*;capture=camera"
            style={{
              display: "none",
            }}
            onChange={handleFileSelection}
          />
        </div>
        {deleteBtn ? (
          <button
            style={{
              width: "100%",
              height: "7vh",
              position: "fixed",
              bottom: "0px",
              fontSize: "1.3rem",
              fontWeight: "900",
              textAlign: "center",
              border: "none",
              backgroundColor: "#ff2f00",
              color: "#ffffff",
            }}
            onClick={(e) => handleCancel(selectId)}
          >
            반납 취소
          </button>
        ) : (
          <button
            style={{
              width: "100%",
              height: "7vh",
              position: "fixed",
              bottom: "0px",
              fontSize: "1.3rem",
              fontWeight: "900",
              textAlign: "center",
              border: "none",
              backgroundColor: isBtn ? "#FFABAB" : "#c9c9c9",
              color: isBtn ? "#ffffff" : "#343434",
            }}
            disabled={!isBtn}
            type="submit"
          >
            반납 신청
          </button>
        )}
      </form>
    </>
  );
};

export default UserReturn;
