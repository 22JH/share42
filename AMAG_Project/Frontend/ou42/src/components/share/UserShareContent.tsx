/** @jsxImportSource @emotion/react */

import TextField from "@mui/material/TextField";
import { UserShareContentStyle } from "./style/UserShareStyle";
import { UserShareContentProps } from "./type/UserShareType";

const UserShareContent = ({
  content,
  handleShareArea,
}: UserShareContentProps) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "15%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: "5%",
        marginLeft: "7.5%",
        marginRight: "7.5%",
      }}
    >
      <div
        style={{
          marginLeft: "3%",
          marginBottom: "2%",
          fontWeight: "900",
          fontSize: "1.1rem",
        }}
      >
        내용
      </div>
      <TextField
        css={UserShareContentStyle}
        id="outlined-multiline-static"
        label="자세한 내용을 작성해 주세요"
        multiline
        rows={4}
        style={{
          width: "85%",
          display: 'flex',
          height: 'auto',
          flexDirection: 'column'
        }}
        onBlur={handleShareArea}
        defaultValue={content}
      />
    </div>
  );
};

export default UserShareContent;
