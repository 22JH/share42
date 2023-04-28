/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";

const container = (value: number) => css`
  width: 100%;
  height: auto;
  color: #a8a8a8;

  .select {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 7%;
    li {
      flex: 1;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      height: 100%;
      display: flex;
      align-items: end;
      justify-content: center;
      p {
        margin-bottom: 7%;
        font-weight: 900;
      }
    }
  }
  li:nth-of-type(${value}) {
    color: black;
    & {
      border-bottom: 2px solid black;
    }
  }
`;

interface Props {
  setValue: React.Dispatch<React.SetStateAction<number>>;
  value: number;
}

function UserMyPageListBtn({ setValue, value }: Props) {
  const { pathname } = useLocation();

  return (
    <div css={container(value + 1)}>
      <ul className="select">
        <li onClick={() => setValue(0)}>
          <p>{pathname === "/user/mypage/usage" ? "사용 중" : "공유 중"}</p>
        </li>
        <li onClick={() => setValue(1)}>
          <p>{pathname === "/user/mypage/usage" ? "사용 신청" : "등록 중"}</p>
        </li>
        <li onClick={() => setValue(2)}>
          <p>취소 및 완료</p>
        </li>
      </ul>
    </div>
  );
}

export default UserMyPageListBtn;
