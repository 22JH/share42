/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { UserCommunityBtnStyle } from "../../routes/user/UserCommunity";

const sortArray = [
  { idx: 0, num: 0, title: "최신순" },
  { idx: 1, num: 1, title: "인기순" },
  { idx: 2, num: 1, title: "소식공유" },
  { idx: 3, num: 2, title: "필요해요" },
  { idx: 4, num: 3, title: "공유해요" },
  { idx: 5, num: 0, title: "모든" },
];

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
