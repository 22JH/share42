import { UserShareDetailContentProps } from "./type/UserShareDetailType";

const UserShareDetailContent = ({
  data,
  likeCount,
}: UserShareDetailContentProps) => {
  return (
    <div
      style={{
        width: "98vw",
        minHeight: "33vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "2vh",
        fontWeight: "900",
        paddingLeft: "1vw",
        paddingRight: "1vw",
      }}
    >
      {/* 나중에 바꿀꺼임 */}
      <span
        style={{
          fontSize: "0.9rem",
          width: "90%",
          textAlign: "left",
        }}
      >
        {data?.article.content}
      </span>
      <span
        style={{
          marginTop: "10vh",
          fontSize: "0.7rem",
          color: "#adadad",
          width: "90%",
          paddingBottom: "1.5vh",
          borderBottom: "1px solid #adadad",
        }}
      >
        관심 {likeCount} · 조회 {data?.article.hits}
      </span>
    </div>
  );
};

export default UserShareDetailContent;
