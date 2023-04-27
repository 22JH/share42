/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { ReportCategorySelectStyle } from "../share/style/UserShareStyle";

export interface UserReportCategoryProps {
  handleSelectCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: {
    value: string;
    category: string;
  }[];
  category: string;
}

const UserReportCategory = ({
  handleSelectCategory,
  options,
  category,
}: UserReportCategoryProps) => {
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
        문의 분류
      </span>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2vh",
        }}
        css={ReportCategorySelectStyle}
      >
        <select value={category} onChange={handleSelectCategory}>
          {options.map((option, index) => (
            <option key={option.value} value={option.value}>
              {option.category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserReportCategory;
