/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";

interface PropType {
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const container = css`
  display: flex;
  height: auto;
  width: 75%;
  flex-direction: column;
  .nameHeader {
    margin-bottom: 5px;
  }
`;

export default function Name({ setName }: PropType) {
  return (
    <div css={container}>
      <div className="nameHeader">이름</div>
      <TextField size="small" css={{ marginBottom: "15px" }} />
      <div className="nameHeader">닉네임</div>
      <TextField size="small" css={{ marginBottom: "15px" }} />
    </div>
  );
}
