/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import { UserReportContentStyle } from "../share/style/UserShareStyle";
import { UserReportAreaProps } from "./type/UserReportType";

const UserReportArea = ({ content, handleShareArea} : UserReportAreaProps) => {
  return (
    <div
      style={{
        marginTop: "2vh",
        width: "100vw",
      }}
    >
      <span
        style={{
          fontSize: "1rem",
          fontWeight: "900",
          marginLeft: "4vw",
        }}
      >
        문의 내용
      </span>
      <TextField
        css={UserReportContentStyle}
        id="outlined-multiline-static"
        label="내용을 입력해 주세요"
        InputLabelProps={{
          style: { color: "#ADADAD" },
        }}
        multiline
        rows={10}
        style={{
          width: "92vw",
          display: "flex",
          height: "auto",
          flexDirection: "column",
          marginLeft: "4vw",
          marginTop: "2vh",
        }}
        onBlur={handleShareArea}
        defaultValue={content}
      />
    </div>
  );
};

export default UserReportArea;
