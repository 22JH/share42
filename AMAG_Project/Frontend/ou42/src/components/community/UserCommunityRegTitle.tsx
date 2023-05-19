import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";

export interface UserCommunityRegTitleProps {
  title: string | null;
  handleCommunityTitle: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const UserCommunityRegTitle = ({
  title,
  handleCommunityTitle,
}: UserCommunityRegTitleProps) => {

  return (
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
      <span
        style={{
          width: "85%",
          marginBottom: "1vh",
          fontSize: "1rem",
          fontWeight: "900",
        }}
      >
        제목
      </span>
      <TextField
        size="small"
        style={{
          width: "85%",
          border: "none",
        }}
        placeholder={"제목을 입력해 주세요"}
        defaultValue={title}
        onBlur={handleCommunityTitle}
        autoComplete="off"
      />
    </div>
  );
};

export default UserCommunityRegTitle;
