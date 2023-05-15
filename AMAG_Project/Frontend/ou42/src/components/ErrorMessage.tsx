/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useQueryClient, useQueryErrorResetBoundary } from "react-query";

const errorMsgStyle = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  & p {
    display: inline-block;
    width: 60%;
    text-align: center;
  }

  p:nth-of-type(1) {
    margin: 30% 0 3% 0;
    font-weight: 900;
    font-size: 1.3rem;
  }
  p:nth-of-type(2) {
    margin: 0 0 0 0;
    font-size: 1rem;
  }
  p:nth-of-type(3) {
    margin: 0 0 5% 0;
    font-size: 1rem;
  }

  & > button {
    border: none;
    display: inline-block;
    width: 60%;
    height: 4vh;
    font-size: 0.7rem;
    font-weight: 900;
    background-color: #ffabab;
    color: white;
    font-weight: 900;
    border-radius: 10px;
    font-size: 0.9rem;
  }
`;

export const ErrorMessage = () => {
  const { reset } = useQueryErrorResetBoundary();

  const queryClient = useQueryClient();
  const refetch = () => {
    return queryClient.refetchQueries();
  };

  const reTry = () => {
    reset();
    refetch();
  };

  return (
    <div css={errorMsgStyle}>
      <p>잠시 후 다시 시도해주세요</p>
      <p>요청을 처리하는데</p>
      <p>실패했습니다.</p>
      <button onClick={reTry}>다시시도</button>
    </div>
  );
};
