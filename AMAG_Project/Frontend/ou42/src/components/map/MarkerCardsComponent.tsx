/** @jsxImportSource @emotion/react */
import { fontWeight } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import markerImg from "../../assets/marker.png";
import { getTimeAgo } from "../../utils/getTimeAgo";
import MapButtonComponent from "./MapButtonComponent";
import { CustomOverlayContentProps } from "./type/MapType";

const MarkerCardsComponent = ({ markerInfo }: CustomOverlayContentProps) => {
  const { pathname } = useLocation();
  const [statusName, setStatusName] = useState<string>("");
  useEffect(() => {
    if (markerInfo.shareArticleShareStatus === 0) {
      setStatusName("수납 대기");
    } else if (markerInfo.shareArticleShareStatus === 1) {
      setStatusName("공유 대기");
    } else if (markerInfo.shareArticleShareStatus === 2) {
      setStatusName("공유 중");
    } else if (markerInfo.shareArticleShareStatus === 3) {
      setStatusName("반납 대기");
    } else if (markerInfo.shareArticleShareStatus === 4) {
      setStatusName("회수 대기");
    } else if (markerInfo.shareArticleShareStatus === 5) {
      setStatusName("회수");
    }
  }, []);

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
          gridTemplateColumns: "1fr 3fr",
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
          <div
            style={{
              fontWeight: "900",
              border: "1px solid black",
              padding: "10%",
            }}
          >
            {markerInfo?.lockerNumber}번
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            whiteSpace: "normal",
          }}
        >
          <div
            style={{
              marginTop: "30px",
              marginLeft: "5%",
              position: "relative",
            }}
          >
            <p
              style={{
                margin: "0",
                color: "#000000",
                opacity: "0.5",
                fontSize: "0.7rem",
              }}
            >
              {markerInfo.shareArticleAccountNickname}
            </p>
            <p
              style={{
                margin: "0",
                fontWeight: "700",
              }}
            >
              {markerInfo.shareArticleName}
            </p>
            <p
              style={{
                margin: "0",
                fontWeight: "900",
                fontSize: "1.2rem",
              }}
            >
              {markerInfo.shareArticleSharePrice.toLocaleString()}원
            </p>
            <p
              style={{
                margin: "10px 0px",
                fontWeight: "900",
                fontSize: "1rem",
                color: '#7b7b7b',
                
              }}
            >
              {getTimeAgo(markerInfo.shareArticleUptDt)}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "15px",
              marginTop: "-40px",
            }}
          >
            {(pathname.includes("admin/map") ||
              pathname.includes("user/map")) &&
              markerInfo && (
                <MapButtonComponent
                  status={markerInfo.shareArticleShareStatus}
                  text={statusName}
                  articleId={markerInfo.shareArticleId}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerCardsComponent;
