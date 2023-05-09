/** @jsxImportSource @emotion/react */

import { CategorySelectStyle } from "./style/UserShareStyle";
import { UserShareCategoryProps } from "./type/UserShareType";

const UserShareCategory = ({
  selectValue
}: UserShareCategoryProps) => {
  return (
    <div 
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '8vh',
      fontSize: '1.5rem',
      fontWeight: '900'
    }}
    css={CategorySelectStyle}>
      [{selectValue}] 
    </div>
  );
};

export default UserShareCategory;
