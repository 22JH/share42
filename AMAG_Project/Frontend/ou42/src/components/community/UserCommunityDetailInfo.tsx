import { FaEye } from "react-icons/fa";

export interface UserCommunityDetailInfoProps {
  data: {
    communityDetail: {
      accountNickname: string;
      accountSigungu: string;
      accountDong: string;
      uptDt: string;
      category: string;
      hits: number;
    };
  };
  getTimeAgo: (timestamp: string) => string;
}

const UserCommunityDetailInfo = ({
  data,
  getTimeAgo,
}: UserCommunityDetailInfoProps) => {
  return (
    <div
      style={{
        height: "7vh",
        padding: "0.5rem 1rem",
        borderBottom: "1px solid #adadad",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "1.2rem",
            fontWeight: "900",
          }}
        >
          {data.communityDetail.accountNickname}
        </span>
        <span>
          {data.communityDetail.accountSigungu +
            " " +
            data.communityDetail.accountDong}{" "}
          · {getTimeAgo(data.communityDetail.uptDt)}
        </span>
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            padding: "0.2rem 0.6rem",
            backgroundColor: "#EFEFEF",
            color: "#3F3F3F",
          }}
        >
          {data.communityDetail.category}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "1.5rem",
          }}
        >
          <FaEye
            style={{
              marginRight: "5%",
              marginTop: "5%",
            }}
          />
          <span>{data.communityDetail.hits}회</span>
        </div>
      </div>
    </div>
  );
};

export default UserCommunityDetailInfo;
