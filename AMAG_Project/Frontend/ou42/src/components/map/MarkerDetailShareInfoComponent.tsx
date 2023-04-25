/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useQuery } from "react-query";
import { GetMarkerInfo } from "./api/ApiMap";
import { useEffect } from "react";
import { MdMap } from "react-icons/md";
import {
  OverlayAddressStyle,
  OverlayListStyle,
  OverlayNameStyle,
  OverlayStyle,
} from "./UseMapComponentStyle";
import MarkerShareInfoComponent from "./MarkerShareInfoComponent";

interface MarkerDetailShareInfoComponentProps {
  id: number;
  setIsOpen: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  address: string;
  name: string;
}

const useMarkerInfo = () => {
  const { isLoading, error, data } = useQuery("markerInfo", GetMarkerInfo);
  return { isLoading, error, markerInfo: data };
};

const MarkerDetailShareInfoComponent = ({
  id,
  setIsOpen,
  address,
  name,
}: MarkerDetailShareInfoComponentProps) => {
  const { markerInfo } = useMarkerInfo();

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
        onClick={() =>
          setIsOpen((prevState) => ({ ...prevState, [id]: false }))
        }
      >
        x
      </button>
      <div css={OverlayNameStyle}>{name}</div>
      {/* 지점 타인 공유리스트 */}
      <div css={OverlayListStyle}>
        {markerInfo ? markerInfo.map((ele:any) => (<MarkerShareInfoComponent key={ele.id} markerInfo={ele} />)) : []}
      </div>
      {/* 지점 주소 */}
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
    </div>
  );
};

export default MarkerDetailShareInfoComponent;
