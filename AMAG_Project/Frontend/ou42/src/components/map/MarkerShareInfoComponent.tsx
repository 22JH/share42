/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import markerImg from "./마크업.png";
import { useEffect } from 'react';
import ShareButton from "./ShareButton";

interface CustomOverlayContentProps {
  markerInfo: any;
}

const MarkerShareInfoStyle = css`
  width: 100%;
  border-bottom: 1px solid black;

  & img {
    width: 100px;
    height: 100px;
    border: 1px solid black;
  }

  & p {
    margin: 0;
  }

  & p:nth-of-type(1) {
    color: #000000;
    opacity: 0.5;
    font-size: 0.7rem;
  }

  & p:nth-of-type(2) {
    font-weight: 700;
  }

  & p:nth-of-type(3) {
    font-weight: 900;
    font-size: 1.2rem;
  }

  & button {
    width: 100px;
    height: 40px;
    font-size: 1.1rem;
    color: white;
    border: none;
    border-radius: 5px;
    background-color: #0cdee8;
  }
`;

const MarkerShareInfoComponent = ({
  markerInfo,
}: CustomOverlayContentProps) => {

  const shareSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    // PUT 요청해야함 그리고 status = 2로 바꿔야함
    markerInfo.status = 2
  }

  return (
    <div css={MarkerShareInfoStyle}>
      <div
        style={{
          height: "150px",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            whiteSpace: "normal",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={markerImg} alt="상품이미지" />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            whiteSpace: "normal",
          }}
        >
          <div style={{ marginTop: "30px" }}>
            <p>{markerInfo.userid}</p>
            <p>{markerInfo.title}</p>
            <br />
            <p>{markerInfo.price.toLocaleString()}원</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "15px",
              marginTop: "-10px",
            }}
          >
            {markerInfo && (
              <ShareButton
                status={markerInfo.status}
                text={
                  markerInfo.status === 0
                    ? "사용신청"
                    : markerInfo.status === 1
                    ? "사용중"
                    : "신청취소"
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerShareInfoComponent;
