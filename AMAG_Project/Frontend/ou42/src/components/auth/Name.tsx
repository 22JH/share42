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
      <div className="nameHeader">Name</div>
      <TextField
        size="small"
        css={{ marginBottom: "15px" }}
        placeholder="이름을 입력해주세요"
      />
      <div className="nameHeader">Nickname</div>
      <TextField
        size="small"
        css={{ marginBottom: "15px" }}
        placeholder="별명을 입력해주세요"
      />
    </div>
  );
}
