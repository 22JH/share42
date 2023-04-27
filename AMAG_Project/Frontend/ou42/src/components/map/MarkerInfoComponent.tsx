/** @jsxImportSource @emotion/react */

import { useState, useEffect } from "react";
import { MdMap } from "react-icons/md";
import { OverlayListStyle } from "./style/MapStyle";
import MarkerCardsComponent from "./MarkerCardsComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { MarkerDetailShareInfoComponentProps } from "./type/MapType";

const MarkerInfoComponent = ({
  id,
  handleMarkerInfo,
  address,
  name,
}: MarkerDetailShareInfoComponentProps) => {
  const { pathname } = useLocation();
  const [markerInfo, setMarkerInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3001/items");
      const data = await response.json();
      setMarkerInfo(data);
    })();
  }, []);

  const handleLogNavigate = () => {
    navigate("/admin/log");
  };

  const handleOperationNavigate = () => {
    navigate("/admin/operation");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "94.3vh",
        background: "white",
        zIndex: "11 !important",
        cursor: "auto !important",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "8px",
          right: "10px",
          border: "none",
          backgroundColor: "#4F63D2",
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
          backgroundColor: "#4f63d2",
          color: "white",
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
        {markerInfo.map((ele: any) => (
          <MarkerCardsComponent key={ele.id} markerInfo={ele} />
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
              backgroundColor: "#4f63d2",
              color: "white",
              fontSize: "1.2rem",
            }}
          >
          <MdMap
            style={{
              width: "40px",
              height: "40px",
              marginRight: "10px",
              marginLeft: "10px",
            }}
          />
          <div
            style={{
              width: "calc(100% - 160px)",
              whiteSpace: "normal",
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
          backgroundColor: "#4f63d2",
          color: "white",
          fontSize: "1.2rem",
        }}>
          <MdMap
            style={{
              width: "40px",
              height: "40px",
              marginRight: "10px",
              marginLeft: "10px",
            }}
          />
          <div
            style={{
              width: "calc(100% - 60px)",
              whiteSpace: "normal",
            }}
          >
            {address}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkerInfoComponent;
