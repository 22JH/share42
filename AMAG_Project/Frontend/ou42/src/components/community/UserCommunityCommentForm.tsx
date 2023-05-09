/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";

export const StyleCommentInput = css`
  & > label {
    font-weight: bold;
  }
`;

export interface UserCommunityCommentFormProps {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    id: string | undefined
  ) => void;
  handleCommentInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string | undefined;
  comment: string;
}

const UserCommunityCommentForm = ({
  handleSubmit,
  handleCommentInput,
  id,
  comment
}: UserCommunityCommentFormProps) => {
  return (
    <>
      <form
        style={{
          position: "fixed",
          bottom: "0",
          width: "100vw",
          height: "8vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={(e) => handleSubmit(e, id)}
      >
        <TextField
          id="outlined-search"
          label="댓글을 입력해주세요"
          type="search"
          onChange={handleCommentInput}
          InputProps={{
            style: {
              border: "none",
              borderRadius: "12px",
              backgroundColor: "#EDEDED",
            },
          }}
          inputProps={{
            style: {
              fontWeight: "bold",
            },
          }}
          css={StyleCommentInput}
          value={comment}
        />
        <button
          style={{
            marginLeft: "1rem",
            backgroundColor: "#FFABAB",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "1.1rem 2rem",
            fontSize: "1rem",
          }}
          type="submit"
        >
          작성
        </button>
      </form>
    </>
  );
};

export default UserCommunityCommentForm;
