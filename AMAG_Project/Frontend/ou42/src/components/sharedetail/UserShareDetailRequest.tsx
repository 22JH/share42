/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { UserShareDetailRequestProps } from "./type/UserShareDetailType";

export const dialog = css`
  border: 0;
  border-radius: 20px;
  animation-name: show;
  animation-duration: 0.5s;
  outline: none;
  position: relative;
  background-color: #fffbfb;

  &::backdrop {
    background-color: #969696;
    opacity: 0.5;
  }

  @keyframes show {
    0% {
      transform: translate(0, 800px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;

const SHARE_USE_API = () => {
  return `https://www.share42-together.com/api/common/usage/1`;
};

const COLLECT_USE_API = () => {
  return `https://www.share42-together.com/api/common/usage/3`;
};

const USER_COLLECT_API = (id : string | undefined) => {
  return `https://www.share42-together.com/api/user/share/collect/${id}`
}

const UserShareDetailRequest = ({
  useRequest,
  handleUseRequest,
  handleUseCancel,
  handleNFC,
  handleChating,
  data,
}: UserShareDetailRequestProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;
  const { userId } = loginObject ? JSON.parse(loginObject) : null;
  const dialogRef = useRef<HTMLDialogElement | any>({});
  const [termsContent, setTermsContent] = useState<string[]>([]);
  const [collectContent, setCollectContent] = useState<string[]>([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: SHARE_USE_API(),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res: any) => {
        const lst = res.data.message[0].content.split("\r\n");
        setTermsContent(lst.slice(0, lst.length - 1));
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: COLLECT_USE_API(),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res: any) => {
        const lst = res.data.message[0].content.split("\r\n");
        setCollectContent(lst.slice(0, lst.length - 1));
      })
      .catch((e) => console.log(e));
  }, []);

  const handleUserCollect = (id:string | undefined) => {
    axios({
      method: 'POST',
      url: USER_COLLECT_API(id),
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {
      if (res.data.status === 200) {
        swal("신청 성공", "회수 신청이 완료되었습니다.", "success");
        navigate('/user/nfc')
      } else {
        swal("신청 실패", "회수 신청이 실패되었습니다.", "error");
      }
      return res.data.message
    })
    .catch((e) => {
      console.log(e)
      swal("서버 오류", "서버 오류로 신청이 실패되었습니다.", "error");
    })
  }

  return (
    <div
      style={{
        width: "85vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "2vh",
        marginBottom: "2vh",
        fontWeight: "900",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>{`${Number(data?.article.sharePrice).toLocaleString()}원`}</span>
        <span
          style={{
            color: "#adadad",
            fontWeight: "500",
          }}
        >
          {data?.article.accountSigungu} {data?.article.accountDong}
        </span>
      </div>
      {userId !== data?.article.accountUserId ? <div>
        {useRequest ? (
          <>
            <button
              style={{
                color: "#ffffff",
                backgroundColor: "#909090",
                border: "none",
                borderRadius: "5px",
                boxShadow: "2px 2px 5px #00000051",
                padding: "1.4vh 4vw",
              }}
              onClick={() => handleUseCancel(id)}
            >
              사용취소
            </button>
            <div
              style={{
                position: "fixed",
                bottom: "12vh",
                right: "8vw",
                width: "5rem",
                height: "5rem",
                borderRadius: "50%",
                textAlign: "center",
                lineHeight: "5rem",
                backgroundColor: "red",
                color: "white",
                fontWeight: "900",
              }}
              onClick={handleNFC}
            >
              NFC
            </div>
          </>
        ) : (
          <button
            style={{
              color: "#ffffff",
              backgroundColor: "#FFABAB",
              border: "none",
              borderRadius: "5px",
              boxShadow: "2px 2px 5px #00000051",
              padding: "1.4vh 4vw",
            }}
            onClick={() => {
              dialogRef?.current.showModal();
            }}
          >
            사용신청
          </button>
        )}
        <button
          style={{
            marginLeft: "3vw",
            color: "#ffffff",
            backgroundColor: "#FFABAB",
            border: "none",
            borderRadius: "5px",
            boxShadow: "2px 2px 5px #00000051",
            padding: "1.4vh 4vw",
          }}
          onClick={handleChating}
          >
          채팅하기
        </button>
      </div> : data?.article.shareStatus === 1 ? <button
          style={{
            marginLeft: "3vw",
            color: "#ffffff",
            backgroundColor: "#1f7500",
            border: "none",
            borderRadius: "5px",
            boxShadow: "2px 2px 5px #00000051",
            padding: "1.4vh 4vw",
          }}
          onClick={() => {
            dialogRef?.current.showModal();
          }}
          >
          회수하기
        </button> : null}
      <dialog
        ref={(ref) => {
          return (dialogRef.current = ref);
        }}
        css={dialog}
        style={{
          textAlign: 'center'
        }}
        >
        <h1>HOW TO 사용신청?</h1>
        <button
          onClick={() => {
            (dialogRef.current as any).close();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            border: 'none',
            backgroundColor: '#ffffff'
          }}
          >
          X
        </button>
        <ul
          style={{
            textAlign: 'left',
            paddingLeft: '20px'
          }}
          >
          {termsContent.map((term, index) => (
            <li 
            style={{
              listStyleType: 'dicimal'
            }}
            key={index}>{term}</li>
            ))}
        </ul>
        <button
          style={{
            padding: '3% 6%',
            fontWeight: '900',
            color: '#ffffff',
            backgroundColor: '#FFABAB',
            border: 'none',
            borderRadius: '12px'
          }}
          onClick={() => handleUseRequest(id)}
          >
          사용 신청하기
        </button>
      </dialog>
      <dialog
        ref={(ref) => {
          return (dialogRef.current = ref);
        }}
        css={dialog}
        style={{
          textAlign: 'center'
        }}
        >
        <h1>HOW TO 회수신청?</h1>
        <button
          onClick={() => {
            (dialogRef.current as any).close();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            border: 'none',
            backgroundColor: '#ffffff'
          }}
        >
          X
        </button>
        <ul
          style={{
            textAlign: 'left',
            paddingLeft: '20px'
          }}
          >
          {collectContent.map((term, index) => (
            <li 
              style={{
                listStyleType: 'dicimal'
              }}
            key={index}>{term}</li>
          ))}
        </ul>
        <button
          style={{
            padding: '3% 6%',
            fontWeight: '900',
            color: '#ffffff',
            backgroundColor: '#FFABAB',
            border: 'none',
            borderRadius: '12px'
          }}
          onClick={() => handleUserCollect(id)}
          >
          회수 신청하기
        </button>
      </dialog>
    </div>
  );
};

export default UserShareDetailRequest;
