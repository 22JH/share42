/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const container = (value: number) => css`
  width: 100%;
  height: auto;
  color: #a8a8a8;
  position: fixed;
  top: 6%;
  z-index: 99;
  background-color: white;

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
  const ulRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const liNodes = ulRef.current?.children;
    if (pathname === "/user/mypage/usage") {
      setValue(2);
    }
    if (liNodes) {
      for (const a of liNodes) {
        a.addEventListener("click", () => {
          if (a.childNodes[0].textContent === "회수이력") {
            setValue(0);
          } else if (a.childNodes[0].textContent === "보관이력") {
            setValue(1);
          } else if (a.childNodes[0].textContent === "사용이력") {
            setValue(2);
          } else if (a.childNodes[0].textContent === "반납이력") {
            setValue(3);
          }
        });
      }
    }
    // setValueLength(
    //   (value) => pipe(L.map, takeAll)((n: Node) => n, liNodes).length
    // );
  }, []);

  return (
    <div css={container(value === 0 || value === 1 ? value + 1 : value - 1)}>
      <ul className="select" ref={ulRef}>
        <li>
          <p>{pathname === "/user/mypage/usage" ? "사용이력" : "회수이력"}</p>
        </li>
        <li>
          <p>{pathname === "/user/mypage/usage" ? "반납이력" : "보관이력"}</p>
        </li>
      </ul>
    </div>
  );
}

export default UserMyPageListBtn;
