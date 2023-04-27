import TextField from "@mui/material/TextField";

export interface UserReportTitleProps {
  value: string;
  handleShareInput: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  text: string;
}

const UserReportTitle = ({
  value,
  handleShareInput,
  text,
}: UserReportTitleProps) => {
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
        문의 제목
      </span>
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
        <TextField
          size="small"
          style={{
            width: "92vw",
            border: "none",
            marginTop: "2vh"
          }}
          placeholder={"제목을 입력해 주세요"}
          defaultValue={value}
          onBlur={handleShareInput}
        />
      </div>
    </div>
  );
};

export default UserReportTitle;
