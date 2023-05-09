/** @jsxImportSource @emotion/react */
import { UserCommunityBtnStyle } from "../../routes/user/UserCommunity";

export interface UserCommunityBtnsProps {
  sortArray: any[];
  handleCommunitySort: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const UserCommunityBtns = ({
  sortArray,
  handleCommunitySort,
}: UserCommunityBtnsProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "2vh",
      }}
      css={UserCommunityBtnStyle}
    >
      {/* 순서버튼 */}
      {sortArray.map((item, idx) => {
        if (item.title === "모든") {
          return null;
        }
        return (
          <button
            key={idx}
            value={item.title}
            onClick={(event) => handleCommunitySort(event)}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
};

export default UserCommunityBtns;
