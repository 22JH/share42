/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useState, useEffect } from "react";
import { MdMap } from "react-icons/md";
import {
  OverlayAddressStyle,
  OverlayListStyle,
  OverlayNameStyle,
  OverlayStyle,
} from "./style/UserMapStyle";
import MarkerCardsComponent from "./MarkerCardsComponent";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface MarkerDetailShareInfoComponentProps {
  id: number;
  handleMarkerInfo: (id: number) => void;
  address: string;
  name: string;
}

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
    <div css={OverlayStyle}>
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
      <div css={OverlayNameStyle}>{name}</div>
      {/* 지점 타인 공유리스트 */}
      <div css={OverlayListStyle}>
        {markerInfo.map((ele: any) => (
          <MarkerCardsComponent key={ele.id} markerInfo={ele} />
        ))}
      </div>
      {/* 지점 주소 */}
      {pathname.includes("admin") ? (
        <div css={OverlayAddressStyle}>
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
        <div css={OverlayAddressStyle}>
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
