/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import mapicon from "../../assets/mapicon.svg";
import { OverlayListStyle } from "./style/MapStyle";
import MarkerCardsComponent from "./MarkerCardsComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { MarkerDetailShareInfoComponentProps } from "./type/MapType";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

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
const RETURN_USE_API = () => {
  return `https://www.share42-together.com/api/common/usage/2`;
};
const MarkerInfoComponent = ({
  id,
  handleMarkerInfo,
  address,
  name,
  markerInfo,
}: MarkerDetailShareInfoComponentProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement | any>({});
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;
  const [termsContent, setTermsContent] = useState<string[]>([]);

  const handleLogNavigate = () => {
    navigate("/admin/log");
  };

  const handleOperationNavigate = () => {
    navigate("/admin/operation");
  };

  const handleReturnNavigate = () => {
    navigate("/user/return", {
      state : id
    })
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: RETURN_USE_API(),
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

  return (
    <div
      style={{
        width: "100vw",
        height: "94.3vh",
        background: "white",
        zIndex: "11 !important",
        cursor: "auto !important",
        position: "fixed",
        transform: "translate(-50%, -47%)",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "8px",
          right: "10px",
          border: "none",
          backgroundColor: "#FFABAB",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
        }}
        onClick={() => handleMarkerInfo(id)}
      >
        x
      </button>
      <div
        style={{
          width: "100%",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFABAB",
          color: "#ffffff",
          fontSize: "1.5rem",
          fontWeight: "900",
        }}
      >
        {name}
      </div>
      {/* 지점 타인 공유리스트 */}
      <div
        css={OverlayListStyle}
        style={{
          width: "100%",
          height: "calc(94.3vh - 10rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "scroll",
        }}
      >
        {markerInfo.map((ele: any, index: number) => (
          <MarkerCardsComponent markerInfo={ele} key={index} />
        ))}
      </div>
      {/* 지점 주소 */}
      {pathname.includes("admin") ? (
        <div
          style={{
            width: "100%",
            height: "5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            backgroundColor: "#FFABAB",
            color: "white",
            fontSize: "1.2rem",
          }}
        >
          <img
            style={{
              width: "40px",
              height: "40px",
              marginRight: "10px",
              marginLeft: "10px",
            }}
            src={mapicon}
            alt="mapicon"
          />
          <div
            style={{
              width: "calc(100% - 160px)",
              whiteSpace: "normal",
              fontSize: "1rem",
            }}
          >
            {address}
          </div>
          <div
            style={{
              width: "98px",
              whiteSpace: "normal",
            }}
          >
            <button
              style={{
                width: "90px",
                height: "35px",
                backgroundColor: "red",
                borderRadius: "5px",
                color: "white",
              }}
              onClick={handleLogNavigate}
            >
              로그조회
            </button>
            <button
              style={{
                width: "90px",
                height: "35px",
                backgroundColor: "black",
                borderRadius: "5px",
                color: "white",
              }}
              onClick={handleOperationNavigate}
            >
              기기조작
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            backgroundColor: "#FFABAB",
            color: "white",
            fontSize: "1.2rem",
          }}
        >
          <img
            style={{
              width: "40px",
              height: "40px",
              marginRight: "10px",
              marginLeft: "10px",
            }}
            src={mapicon}
            alt="mapicon"
          />
          <div
            style={{
              width: "calc(100% - 160px)",
              whiteSpace: "normal",
              fontSize: "1rem",
            }}
          >
            {address}
          </div>
          <div
            style={{
              width: "98px",
              whiteSpace: "normal",
            }}
          >
            <button
              style={{
                width: "90px",
                height: "60px",
                backgroundColor: "#c74695",
                borderRadius: "5px",
                color: "white",
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => {
                dialogRef?.current.showModal();
              }}
              >
              반납 하기
            </button>
          </div>
        </div>
      )}
      <dialog
        ref={(ref) => {
          return (dialogRef.current = ref);
        }}
        css={dialog}
        style={{
          textAlign: 'center'
        }}
        >
        <h1>HOW TO 반납신청?</h1>
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
              listStyleType: 'dicimal',
              whiteSpace: 'normal'
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
          onClick={handleReturnNavigate}
        >
          반납 신청하기
        </button>
      </dialog>
    </div>
  );
};

export default MarkerInfoComponent;
