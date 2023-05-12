/** @jsxImportSource @emotion/react */
import { UserCommunityBtnStyle } from "../../routes/user/UserCommunity";

export interface UserCommunityBtnsProps {
  sort: number;
  category: {
    idx: number;
    num: number;
    title: string;
  };
  sortArray: any[];
  handleCommunitySort: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  recent: boolean;
  popular: boolean;
  news: boolean;
  need: boolean;
  share: boolean;
  all: boolean;
}

const UserCommunityBtns = ({
  sort,
  category,
  sortArray,
  handleCommunitySort,
  recent,
  popular,
  news,
  need,
  share,
  all
}: UserCommunityBtnsProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "2vh",
        position: "fixed",
        top: "6vh",
        left: "7vw",
        backgroundColor: "#ffffff !important",
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
            className={
              item.category === "recent"
              ? `sort-button-recent ${recent ? "active" : ""}`
              : item.category === "popular"
              ? `sort-button-popular ${popular ? "active" : ""}`
              : item.category === "news"
              ? `sort-button-news ${news ? "active" : ""}`
              : item.category === "need"
              ? `sort-button-need ${need ? "active" : ""}`
              : item.category === "share"
              ? `sort-button-share ${share ? "active" : ""}`
              : ``
            }
            onClick={(event) => handleCommunitySort(event)}
          >
            {item.title} {item.category}
          </button>
        );
      })}
    </div>
  );
};

export default UserCommunityBtns;
