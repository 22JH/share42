import axios from "axios";
import { FaEye } from "react-icons/fa";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

export interface UserCommunityDetailInfoProps {
  data: {
    communityDetail: {
      accountNickname: string;
      accountUserId: string;
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
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;
  const { userId } = loginObject ? JSON.parse(loginObject) : null;
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: communityDelete } = useMutation(() =>
    axios
      .delete(
        `http://www.share42-together.com:8088/api/user/community/posts/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.status);
        if (res.data.status === 200) {
          swal("삭제 완료", "게시물 삭제가 완료되었습니다.", "success");
        } else {
          swal("삭제 실패", "게시물 삭제가 실패되었습니다.", "error");
        }
      })
      .then((status) => navigate(`/user/community`))
      .catch((e) => {
        console.log(e);
        swal("서버 오류", "서버 오류로 신청이 실패되었습니다.", "error");
      })
  );

  const handleDelete = () => {
    communityDelete();
  };

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
          <span>{data?.communityDetail?.accountNickname}</span>
          {userId === data?.communityDetail?.accountUserId ? (
            <>
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: "900",
                  color: "#7a7a7a",
                  marginLeft: "8vw",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/user/community/reg", {
                    state: {
                      data,
                      editStatus: true,
                      id,
                    },
                  });
                }}
              >
                수정
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: "900",
                  color: "#7a7a7a",
                  marginLeft: "2vw",
                  cursor: "pointer",
                }}
                onClick={handleDelete}
              >
                삭제
              </span>
            </>
          ) : null}
        </span>
        <span>
          {data?.communityDetail?.accountSigungu +
            " " +
            data?.communityDetail?.accountDong}{" "}
          · {getTimeAgo(data?.communityDetail?.uptDt)}
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
          {data?.communityDetail?.category}
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
          <span>{data?.communityDetail?.hits}회</span>
        </div>
      </div>
    </div>
  );
};

export default UserCommunityDetailInfo;
