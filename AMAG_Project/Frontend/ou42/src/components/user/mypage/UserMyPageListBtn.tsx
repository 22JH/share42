/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { L, pipe } from "../../../custom/FxJS";
import { takeAll } from "./../../../custom/FxJS";

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
  setValueLength: React.Dispatch<React.SetStateAction<number>>;
}

function UserMyPageListBtn({ setValue, value, setValueLength }: Props) {
  const { pathname } = useLocation();
  const ulRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const liNodes = ulRef.current?.children;
    setValueLength(
      (value) => pipe(L.map, takeAll)((n: Node) => n, liNodes).length
    );
  }, []);

  return (
    <div css={container(value + 1)}>
      <ul className="select" ref={ulRef}>
        <li onClick={() => setValue(0)}>
          <p>{pathname === "/user/mypage/usage" ? "사용이력" : "보관이력"}</p>
        </li>
        <li onClick={() => setValue(1)}>
          <p>{pathname === "/user/mypage/usage" ? "반납이력" : "회수이력"}</p>
        </li>
      </ul>
    </div>
  );
}

export default UserMyPageListBtn;
