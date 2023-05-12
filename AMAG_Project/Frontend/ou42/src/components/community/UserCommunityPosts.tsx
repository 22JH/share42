import { FaRegComment, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export interface UserCommunityPostsProps {
  data: any[];
  divRef: React.MutableRefObject<any>;
  getTimeAgo: (timestamp: string) => string;
}

const UserCommunityPosts = ({
  data,
  divRef,
  getTimeAgo,
}: UserCommunityPostsProps) => {
  const navigate = useNavigate();

  const handleDetailNavigate = (id:number) => {
    navigate(`/user/community/${id}`)
  }

  return (
    <div
      style={{
        borderTop: "1px solid #adadad",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "7vh",
        marginTop: "11vh"
      }}
    >
      {data?.map((item: any, index: number) => {
        return (
          <div
            ref={(ref) => (divRef.current[index] = ref)}
            style={{
              padding: "1rem",
              height: "140px",
              width: "90vw",
              borderBottom: "1px solid #adadad",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={index}
            onClick={() => handleDetailNavigate(item.communityId)}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  padding: "0.5rem 1rem",
                  width: "4rem",
                  height: "1.4rem",
                  backgroundColor: "#EFEFEF",
                  color: "#3b3b3b",
                }}
              >
                {item.category}
              </span>
              <span
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "900",
                  lineHeight: "2.5rem",
                }}
              >
                {item.title.length > 15
                  ? item.title.slice(0, 10) + "..."
                  : item.title}
              </span>
              <span
                style={{
                  color: "#adadad",
                  lineHeight: "1rem",
                  fontWeight: "900",
                }}
              >
                {item.content.length > 15
                  ? item.content.slice(0, 15) + "..."
                  : item.content}
              </span>
              <span
                style={{
                  color: "#adadad",
                  lineHeight: "2rem",
                  fontWeight: "900",
                }}
              >
                {item.sigungu + " " + item.dong + "·" + getTimeAgo(item.uptdt)}
              </span>
            </div>
            <div
              style={{
                width: "24vw",
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: 'end',
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#adadad",
                  fontSize: "1rem",
                }}
              >
                <FaRegComment
                  style={{
                    fontSize: "1rem",
                    color: "#adadad",
                  }}
                />
                <div
                  style={{
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                  }}
                >
                  {item.commentCount === null ? 0 : item.commentCount}
                </div>
                <FaEye
                  style={{
                    fontSize: "1.2rem",
                    color: "#adadad",
                  }}
                />
                <div
                  style={{
                    marginLeft: "0.5rem",
                  }}
                >
                  {item.hits}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserCommunityPosts;
