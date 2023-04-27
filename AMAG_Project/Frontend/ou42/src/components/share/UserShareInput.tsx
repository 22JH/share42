import TextField from "@mui/material/TextField";
import { UserShareInputProps } from "./type/UserShareType";

const UserShareInput = ({
  value,
  handleShareInput,
  text,
}: UserShareInputProps) => {
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
      <TextField
        size="small"
        style={{
          width: "85vw",
          border: "none",
          borderBottom: "3px solid #D14D72",
        }}
        placeholder={text}
        defaultValue={value}
        onBlur={handleShareInput}
      />
    </div>
  );
};

export default UserShareInput;
