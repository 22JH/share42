/** @jsxImportSource @emotion/react */

import { CategorySelectStyle } from "../../routes/user/UserShareReg";

export interface UserShareCategoryProps {
  options: { value: string; category: string }[];
  handleSelectCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void
  selectValue: string
}

const UserShareCategory = ({
  options,
  handleSelectCategory,
  selectValue
}: UserShareCategoryProps) => {
  return (
    <div css={CategorySelectStyle}>
      <select value={selectValue} onChange={handleSelectCategory}>
        {options.map((option, index) => (
          <option key={option.value} value={option.value}>
            {option.category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserShareCategory;
