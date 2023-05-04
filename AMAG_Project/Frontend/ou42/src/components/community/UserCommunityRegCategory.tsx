/** @jsxImportSource @emotion/react */

import { CategorySelectStyle } from "../../routes/user/UserCommunityReg";

export interface UserCommunityRegCategoryProps {
  category: string;
  options: {
    value: string;
    category: string;
  }[];
  handleSelectCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const UserCommunityRegCategory = ({
  category,
  options,
  handleSelectCategory,
}: UserCommunityRegCategoryProps) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3vh",
      }}
      css={CategorySelectStyle}
    >
      <span
        style={{
          width: "85%",
          marginBottom: "1vh",
          fontSize: "1rem",
          fontWeight: "900",
        }}
      >
        카테고리
      </span>
      <select
        style={{
          border: '1px solid #a5a5a5 !important',
          color: '#a5a5a5'
        }}
      value={category} onChange={handleSelectCategory}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserCommunityRegCategory;
