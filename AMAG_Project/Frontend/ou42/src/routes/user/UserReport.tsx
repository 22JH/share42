/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";

import React, { useMemo, useState } from "react";
import UserReportArea from "../../components/report/UserReportArea";
import UserReportCategory from "../../components/report/UserReportCategory";
import UserReportDiv from "../../components/report/UserReportDiv";
import UserReportFile from "../../components/report/UserReportFile";
import UserReportTitle from "../../components/report/UserReportTitle";
import { useEffect } from "react";
import BottomMenuBar from "../../components/BottomMenuBar";
import navStore from "../../store/navStore";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const page = 1;
const size = 20;

const options = [
  { value: "99", category: "카테고리를 선택해 주세요" },
  { value: "0", category: "분실" },
  { value: "1", category: "고장" },
  { value: "2", category: "파손" },
];

const LOCKER_STATIONS_API = (page: number, size: number) => {
  return `https://www.share42-together.com:8088/api/common/locker/locker-stations/${page}/${size}`;
};

const LOCKER_API = (page: number, size: number, lockerId: string) => {
  return `https://www.share42-together.com:8088/api/common/locker/${page}/${size}/${lockerId}`;
};

const UserReport = () => {
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;

  const [typeSelect, setTypeSelect] = useState<number>(0);
  const [lockerSelect, setLockerSelect] = useState<string>("");
  const [lockerLst, setLockerLst] = useState<any[]>([]);
  const [stationSelect, setStationSelect] = useState<string>("");
  const [stationLst, setStationLst] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<null | File>(null);
  const [fileName, setFileName] = useState<string>("");
  const [reportData, setReportData] = useState<FormData | null>(null);
  const { pathname } = useLocation();
  const { state } = useLocation();

  const formData = useMemo(() => new FormData(), []);

  useEffect(() => {
    file && formData.append("imgFile", file);
    category && formData.append("category", category);
    title && formData.append("title", title);
    content && formData.append("content", content);
    state && formData.append("shareArticleId", state);
    lockerSelect && formData.append("lockerId", lockerSelect);
    setReportData(formData);
  }, [file, category, title, content, formData, lockerSelect, state]);

  const { pathTitle, setPathTitle } = navStore();

  useEffect(() => {
    if (pathname === "/user/report") {
      setPathTitle("신고하기");
    } else {
      setPathTitle("");
    }
  }, [pathname, setPathTitle]);

  const handleTypeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeSelect(Number(e.target.value));
  };

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (e.target as HTMLSelectElement).value;
    if (category !== value) {
      setCategory(value);
    }
  };

  const handleSelectStation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (e.target as HTMLSelectElement).value;
    if (stationSelect !== value) {
      setStationSelect(value);
    }
  };

  const handleSelectLocker = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (e.target as HTMLSelectElement).value;
    if (lockerSelect !== value) {
      setLockerSelect(value);
    }
  };

  const handleShareTitle = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setTitle(e?.target?.value);
  };

  const handleShareArea = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setContent(e?.target?.value);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFile(null);
    setFileName("");
  };

  const navigate = useNavigate();

  const handleReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // post로 보내기 / multipart
    e.preventDefault();
    fetch(
      `https://www.share42-together.com:8088/api/user/reports/${typeSelect}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        if (data?.status === 200) {
          swal("신고 완료", "신고가 완료되었습니다.", "success");
          navigate("/home");
        } else {
          swal("신고 실패", "신고가 실패되었습니다.", "error");
        }
      })
      .catch((e) => {
        swal("서버 오류", "서버 접속이 실패되었습니다.", "error");
      });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: LOCKER_STATIONS_API(page, size),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const lst = [
          {
            name: "카테고리를 선택해 주세요.",
            id: 99,
            address: "",
          },
          ...res.data.message.content,
        ];
        return lst;
      })
      .then((lst) => {
        setStationLst(lst);
      })
      .catch();
  }, [token]);

  useEffect(() => {
    if (stationSelect !== "") {
      axios({
        method: "GET",
        url: LOCKER_API(page, size, stationSelect),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          const lst = [
            {
              id: 99,
              lockerNumber: 0,
            },
            ...res.data.message.content,
          ];
          return lst;
        })
        .then((lst) => {
          setLockerLst(lst);
        })
        .catch();
    }
  }, [stationSelect, token]);

  return (
    <>
      <UserReportDiv
        typeSelect={typeSelect}
        handleTypeSelect={handleTypeSelect}
      />
      {typeSelect === 0 ? (
        <form
          onSubmit={handleReportSubmit}
          style={{
            width: "100vw",
            minHeight: "80vh",
            borderBottom: "1px solid #CDCDCD",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <UserReportCategory
            handleSelectCategory={handleSelectCategory}
            options={options}
            category={category}
            title={`문의 분류`}
          />
          <UserReportTitle
            value={title}
            text={"제목"}
            handleShareInput={handleShareTitle}
          />
          <UserReportArea content={content} handleShareArea={handleShareArea} />
          <UserReportFile
            preview={file}
            fileName={fileName}
            handleFileInputChange={handleFileInputChange}
            handleRemoveImage={handleRemoveImage}
          />
          <button
            style={{
              width: "92vw",
              paddingLeft: "3vw",
              paddingRight: "3vw",
              height: "5vh",
              textAlign: "center",
              lineHeight: "5vh",
              backgroundColor: "#FFABAB",
              border: "none",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "900",
              borderRadius: "5px",
              marginTop: "5%",
              marginLeft: "7.5%",
              marginRight: "7.5%",
              marginBottom: "10vh",
            }}
            type="submit"
          >
            신고접수
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleReportSubmit}
          style={{
            width: "100vw",
            minHeight: "80vh",
            borderBottom: "1px solid #CDCDCD",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <UserReportCategory
            handleSelectCategory={handleSelectStation}
            stationLst={stationLst}
            category={stationSelect}
            title={"지점 선택"}
          />
          <UserReportCategory
            handleSelectCategory={handleSelectLocker}
            lockerLst={lockerLst}
            category={lockerSelect}
            title={`라커 선택`}
          />
          <UserReportCategory
            handleSelectCategory={handleSelectCategory}
            options={options}
            category={category}
            title={`문의 분류`}
          />
          <UserReportTitle
            value={title}
            text={"제목"}
            handleShareInput={handleShareTitle}
          />
          <UserReportArea content={content} handleShareArea={handleShareArea} />
          <UserReportFile
            preview={file}
            fileName={fileName}
            handleFileInputChange={handleFileInputChange}
            handleRemoveImage={handleRemoveImage}
          />
          <button
            style={{
              width: "92vw",
              paddingLeft: "3vw",
              paddingRight: "3vw",
              height: "5vh",
              textAlign: "center",
              lineHeight: "5vh",
              backgroundColor: "#FFABAB",
              border: "none",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "900",
              borderRadius: "5px",
              marginTop: "5%",
              marginLeft: "7.5%",
              marginRight: "7.5%",
              marginBottom: "10vh",
            }}
            type="submit"
          >
            신고접수
          </button>
        </form>
      )}
      <BottomMenuBar />
    </>
  );
};

export default UserReport;
