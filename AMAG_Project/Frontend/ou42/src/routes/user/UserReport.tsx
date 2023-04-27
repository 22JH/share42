/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";


import { useState } from "react";
import clip from '../../assets/clip.svg';
import UserReportArea from "../../components/report/UserReportArea";
import UserReportCategory from "../../components/report/UserReportCategory";
import UserReportDiv from "../../components/report/UserReportDiv";
import UserReportTitle from "../../components/report/UserReportTitle";

const UserReport = () => {
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [preview, setPreview] = useState<null | File>(null);
  const [fileName, setFileName] = useState<string>('');

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
      setPreview(e.target.files[0]);
      setFileName(e.target.files[0].name)
    }
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setPreview(null);
  };

  return (
    <>
      <UserReportDiv />
      <form
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
        {/* <UserShareImg
          preview={preview}
          handleFileInputChange={handleFileInputChange}
          handleRemoveImage={handleRemoveImage}
        /> */}
        <div
          style={{
            marginTop: "2vh",
            width: "100vw",
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
            <div
              style={{
                width: "100vw",
                height: "50px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "85vw",
                  height: "6vh",
                  border: "1px solid #adadad",
                  borderRadius: "5px",
                  lineHeight: "6vh",
                  padding: "0 3vw",
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ color: "#000000" }}>+ {fileName}</span>
              </div>
            </div>
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            htmlFor="camera"
          >
            <div
              style={{
                width: "100vw",
                height: "50px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "85vw",
                  height: "6vh",
                  border: "1px solid #adadad",
                  borderRadius: "5px",
                  lineHeight: "6vh",
                  padding: "0 3vw",
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ color: "#adadad" }}>+ 파일 첨부</span>
                <img src={clip} alt='clip' />
              </div>
            </div>
          </label>
          <input
            id="camera"
            name="camera"
            type="file"
            accept="image/*;capture=camera"
            style={{
              display: "none",
            }}
            onChange={handleFileInputChange}
          />
        </div>
        <div></div>
      </form>
    </>
  );
};

export default UserReport;
