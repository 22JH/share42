/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

const container = css`
  width: 90%;
  margin: 0 5% 0 5%;

  p {
    font-weight: 900;
    margin: 5% 0 3% 0;
  }

  select {
    width: 100%;
    height: 5vh;
    border-radius: 5px;
    border: #a5a5a5 1px solid;
    outline: 0 none;
    background: none;
    &:focus {
      border: #a5a5a5 1px solid;
    }

    color: #000000;

    &:nth-of-type(2) {
      margin: 0 0 8% 0;
    }
  }
`;

function AdminSelectBox() {
  const [area, setArea] = useState<string>("");
  const [branch, setBranch] = useState<string>("");

  const options = [
    { value: "서울", text: "서울" },
    { value: "대구", text: "대구" },
    { value: "대전", text: "대전" },
  ];

  // 지역 선택 함수
  const clickArea = (e: React.MouseEvent<HTMLSelectElement>) => {
    const value = (e.target as HTMLSelectElement).value;
    if (area !== value) {
      setArea(value);
    }
  };

  // 지점 선택 함수
  const clickBranch = (e: React.MouseEvent<HTMLSelectElement>) => {
    const value = (e.target as HTMLSelectElement).value;
    if (branch !== value) {
      setBranch(value);
    }
  };

  return (
    <div css={container}>
      <p>지역선택</p>
      <select onClick={clickArea}>
        <option value="">지역을 선택해주세요</option>
        {options.map((option, index) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>

      <p>지점선택</p>
      <select onClick={clickBranch}>
        <option value="">지점을 선택해주세요</option>
        {options.map((option, index) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AdminSelectBox;
