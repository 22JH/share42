/** @jsxImportSource @emotion/react */

import TextField from "@mui/material/TextField";
import { CommunityContentStyle } from "../../routes/user/UserCommunityReg";

export interface UserCommunityRegContentProps {
  content: string;
  handleShareArea: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const UserCommunityRegContent = ({
  content,
  handleShareArea,
}: UserCommunityRegContentProps) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: '8vh'
      }}
    >
      <span
        style={{
          width: "85%",
          marginBottom: "1vh",
          fontSize: "1rem",
          fontWeight: "900",
        }}
      >
        내용
      </span>
      <TextField
        css={CommunityContentStyle}
        id="outlined-multiline-static"
        label="자세한 내용을 작성해 주세요"
        multiline
        rows={4}
        style={{
          width: "85%",
          border: "none",
        }}
        onChange={handleShareArea}
        defaultValue={content}
        autoComplete="off"
      />
    </div>
  );
};

export default UserCommunityRegContent;
