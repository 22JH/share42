/** @jsxImportSource @emotion/react */

import { CategorySelectStyle } from "./style/UserShareStyle";
import { UserShareCategoryProps } from "./type/UserShareType";

const UserShareCategory = (state: UserShareCategoryProps) => {
  console.log(state);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "8vh",
        fontSize: "1.5rem",
        fontWeight: "900",
      }}
      css={CategorySelectStyle}
    ></div>
  );
};

export default UserShareCategory;
