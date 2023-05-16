/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */

import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { FaHeartStyle } from "./style/UserShareDetailStyle";
import { UserShareDetailPostInfoProps } from "./type/UserShareDetailType";

const UserShareDetailPostInfo = ({
  isLike,
  data,
  setIsLike
}: UserShareDetailPostInfoProps) => {
  const { id } = useParams();
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;
  const { userId } = loginObject ? JSON.parse(loginObject) : null;
  const navigate = useNavigate();

  const likeAdd = async (id: string | undefined) => {
    try {
      const res = await axios({
        method: "POST",
        url: `https://www.share42-together.com:8088/api/user/share/share-articles/like/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if(res.data.status === 200) {
        setIsLike(true)
        return res.data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  const likeDelete = async (id: string | undefined) => {
    try {
      const res = await axios({
        method: "POST",
        url: `https://www.share42-together.com:8088/api/user/share/share-articles/unlike/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if(res.data.status === 200) {
        setIsLike(false)
        return res.data;
      }
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  const handleLike = (id: string | undefined) => {
    if (isLike === false) {
      likeAdd(id);
    } else if (isLike === true) {
      likeDelete(id);
    }
  };

  const handleDelete = async (id:string | undefined) => {
    await axios({
      method: "DELETE",
      url: `https://www.share42-together.com:8088/api/user/share/share-articles/${id}`,
      headers : {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {
      if (res.data.status === 200) {
        swal("삭제 완료", "게시물 삭제가 완료되었습니다.", "success");
        navigate("/home");
      } else {
        swal("삭제 실패", "게시물 삭제를 실패하였습니다.", "error");
      }
    })
    .catch((e) => {
      console.log(e)
      swal("서버 오류", "서버 오류가 발생했습니다.", "error");
    })
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90vw",
        borderBottom: "1px solid #adadad",
      }}
    >
      <div
        style={{
          width: "90vw",
          height: "10vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "50px",
            height: "50px",
          }}
          src={`${process.env.REACT_APP_IMAGE_URL}${data?.article.accountImg}`}
          alt="ProfilePic"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "3vw",
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ fontSize: "1.1rem", fontWeight: "900" }}>
              {data?.article.accountNickname}
            </span>
            {data?.article.accountUserId === userId ? <div>
              <span
                style={{
                  color: '#adadad',
                  fontWeight: '900',
                  marginLeft: '24vw'
                }}
                onClick={() => { navigate('/user/share-reg', {
                  state: {
                    data,
                    editStatus: true,
                    id,
                  }
                })}}
              >수정</span>
              <span
                style={{
                  color: '#adadad',
                  fontWeight: '900',
                  marginLeft: '2vw'
                }}
                onClick={() => handleDelete(id)}
              >삭제</span>
            </div> : null}
          </div>
          <span style={{ color: "#ADADAD" }}>
            {data?.article.category} · {data?.article.accountSigungu} {data?.article.accountDong}{" "}
            {getTimeAgo(data?.article.uptDt)}
          </span>
        </div>
      </div>
      <div onClick={() => handleLike(id)}>
        <FaHeart
          css={FaHeartStyle}
          className={isLike ? "like" : ""}
          style={{
            color: isLike ? "red" : "#ADADAD",
            fontSize: "45px",
          }}
        />
      </div>
    </div>
  );
};

export default UserShareDetailPostInfo;
