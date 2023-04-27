/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import markerImg from "../../assets/marker.png";
import MapButtonComponent from "./MapButtonComponent";
import { CustomOverlayContentProps } from "./type/MapType";

const MarkerCardsComponent = ({ markerInfo }: CustomOverlayContentProps) => {
  const shareSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    // PUT 요청해야함 그리고 status = 2로 바꿔야함
    markerInfo.status = 2;
  };

  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <div
      style={{
        width: "100%",
        borderBottom: "1px solid black",
      }}
    >
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
          <img
            style={{
              width: "100px",
              height: "100px",
              border: "1px solid black",
            }}
            src={markerImg}
            alt="상품이미지"
          />
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
            <p
              style={{
                margin: "0",
                color: "#000000",
                opacity: "0.5",
                fontSize: "0.7rem",
              }}
            >
              {markerInfo.userid}
            </p>
            <p
              style={{
                margin: "0",
                fontWeight: "700",
              }}
            >
              {markerInfo.title}
            </p>
            <br />
            <p
              style={{
                margin: "0",
                fontWeight: "900",
                fontSize: "1.2rem",
              }}
            >
              {markerInfo.price.toLocaleString()}원
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "15px",
              marginTop: "-10px",
            }}
          >
            {!pathname.includes("admin") && markerInfo && (
              <MapButtonComponent
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

export default MarkerCardsComponent;
