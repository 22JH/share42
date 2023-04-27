/** @jsxImportSource @emotion/react */

import { CategorySelectStyle } from "./style/UserShareStyle";
import { UserShareCategoryProps } from "./type/UserShareType";

const UserShareCategory = ({
  options,
  handleSelectCategory,
  selectValue
}: UserShareCategoryProps) => {
  return (
    <div 
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    css={CategorySelectStyle}>
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
