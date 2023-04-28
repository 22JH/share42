/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";

import { useMemo, useState } from "react";
import UserReportArea from "../../components/report/UserReportArea";
import UserReportCategory from "../../components/report/UserReportCategory";
import UserReportDiv from "../../components/report/UserReportDiv";
import UserReportFile from "../../components/report/UserReportFile";
import UserReportTitle from "../../components/report/UserReportTitle";
import { useEffect } from "react";

const UserReport = () => {
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<null | File>(null);
  const [fileName, setFileName] = useState<string>("");
  const [reportData, setReportData] = useState<FormData | null>(null);

  const formData = useMemo(() => new FormData(), []);

  useEffect(() => {
    file && formData.append("file", file);
    category && formData.append("category", category);
    title && formData.append("title", title);
    content && formData.append("content", content);
    setReportData(formData);
  }, [file, category, title, content, formData]);

  const options = [
    { value: "카테고리를 선택해 주세요", category: "카테고리를 선택해 주세요" },
    { value: "물건 분실 및 파손 신고", category: "물건 분실 및 파손 신고" },
    { value: "공유 글 신고", category: "공유 글 신고" },
    { value: "대여함 파손 및 고장 신고", category: "대여함 파손 및 고장 신고" },
  ];

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (e.target as HTMLSelectElement).value;
    if (category !== value) {
      setCategory(value);
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

  const handleReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // post로 보내기 / multipart
    e.preventDefault();

    // formData 저장 확인
    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }
  };

  return (
    <>
      <UserReportDiv />
      <form
        onSubmit={handleReportSubmit}
        style={{
          width: "100vw",
          height: "80vh",
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
            position: "relative",
          }}
          type="submit"
        >
          신고접수
        </button>
      </form>
    </>
  );
};

export default UserReport;
