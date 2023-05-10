/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */

import { useState, useEffect } from "react";
import { MdMap } from "react-icons/md";
import mapicon from "../../assets/mapicon.svg";
import { OverlayListStyle } from "./style/MapStyle";
import MarkerCardsComponent from "./MarkerCardsComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { MarkerDetailShareInfoComponentProps } from "./type/MapType";

const MarkerInfoComponent = ({
  id,
  handleMarkerInfo,
  address,
  name,
  markerInfo,
}: MarkerDetailShareInfoComponentProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogNavigate = () => {
    navigate("/admin/log");
  };

  const handleOperationNavigate = () => {
    navigate("/admin/operation");
  };

  const handleReturnNavigate = () => {
    navigate("/user/return")
  }

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
              onClick={handleReturnNavigate}
            >
              반납 하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkerInfoComponent;
