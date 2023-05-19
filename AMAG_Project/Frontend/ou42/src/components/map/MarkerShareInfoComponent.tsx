/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { useMap } from "react-kakao-maps-sdk";
import { useLocation } from "react-router";
import shareIsOpenStore from "../../store/shareIsOpenStore";
import { useBranchChoiceStore } from "./store/useBranchChoiceStore";
import { MarkerShareInfoComponentProps } from "./type/MapType";

const MarkerShareInfoComponent = ({
  marker,
  handleMarkerInfo,
  name,
  totalCount,
  useCount,
  setIsVisible,
  setIsOpen,
  markerId,
  position
}: MarkerShareInfoComponentProps) => {
  const { setBranchChoice } = useBranchChoiceStore();
  const { setIsOpenShareMap } = shareIsOpenStore();
  const { pathname } = useLocation();
  const map = useMap();

  const handleChoiceName = (name: string, id: string | null) => {
    if (pathname?.includes("share-reg")) {
      setBranchChoice({ name, id });
      setIsOpenShareMap(false);
    } else {
      setIsVisible((prevState:any) => ({ ...prevState, [markerId]: false }));
      setIsOpen((prevState:any) => ({ ...prevState, [markerId]: true }));
      if (map) {
        const center = new kakao.maps.LatLng(position.lat, position.lng);
        map.panTo(center)
      }
    }
  };

  return (
    <>
      <div
        style={{
          width: "80vw",
          height: "20vh",
          background: "white",
          zIndex: "11 !important",
          borderRadius: "20px",
          boxShadow: "1px 1px 3px #ffabab",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "auto !important",
          position: 'relative'
        }}
        onClick={() => handleMarkerInfo(marker.id)}
      >
        <button
          style={{
            position: "absolute",
            top: "8px",
            right: "10px",
            border: "none",
            backgroundColor: "white",
            color: "#000000",
            fontSize: "24px",
            cursor: "pointer",
          }}
          onClick={() => handleMarkerInfo(marker.id)}
        >
          x
        </button>
        <div
          style={{
            fontSize: "1.6rem",
            fontWeight: "900",
            marginBottom: "1.2rem",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontWeight: "900",
            marginBottom: "0.2rem",
          }}
        >
          {marker.address}
        </div>
        <div
          style={{
            fontWeight: "900",
            marginBottom: "0.2rem",
          }}
        >
          {`사물함 갯수 / 사용 가능 : ` + totalCount + ` / ` + useCount}
        </div>
      </div>
      <div>
        <div
          style={{
            marginTop: "3vh",
            width: "80vw",
            height: "8vh",
            background: "white",
            zIndex: "11 !important",
            borderRadius: "20px",
            boxShadow: "1px 1px 3px #afafaf",
            lineHeight: "8vh",
            textAlign: "center",
            fontSize: "1.6rem",
            fontWeight: "900",
            backgroundColor: "#FFABAB",
            color: "white",
          }}
          onClick={() => handleChoiceName(marker.name, String(marker.id))}
        >
          <span>선택하기</span>
        </div>
      </div>
    </>
  );
};

export default MarkerShareInfoComponent;
