import { FaRegComment } from "react-icons/fa";

export interface UserCommunityDetailContentProps {
  data: {
    commentCount: number;
    communityDetail: {
      title: string;
      content: string;
    };
  };
}

const UserCommunityDetailContents = ({
  data,
}: UserCommunityDetailContentProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "50vh",
        borderBottom: "1px solid #adadad",
        padding: "1rem 2rem",
      }}
    >
      <p
        style={{
          fontSize: "1.6rem",
          fontWeight: "900",
          marginBottom: "0px",
        }}
      >
        {data.communityDetail.title}
      </p>
      <div
        style={{
          padding: "0.5rem",
          minHeight: "40vh",
        }}
      >
        <span
          style={{
            color: "#7e7e7e",
          }}
        >
          {data.communityDetail.content}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <FaRegComment
          style={{
            marginRight: "0.5rem",
            marginTop: "1%",
          }}
        />
        <span>댓글 {data.commentCount}</span>
      </div>
    </div>
  );
};

export default UserCommunityDetailContents;
