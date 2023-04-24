/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import { GetMarkerInfo } from "./api/ApiMap";
import { useEffect } from "react";
import addressImg from "../map/주소마커.png";
import { MdMap } from "react-icons/md";

interface BranchShareInfoComponentProps {
  id: number;
  setIsOpen: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  address: string;
  name: string;
}

const OverlayStyle = css`
  position: relative;
  top: 220px;
  left: -150px;
  width: 250px;
  height: 400px;
  background: white;
  z-index: 11 !important;
  cursor: auto !important;
`;

const OverlayNameStyle = css`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4f63d2;
  color: white;
  font-size: 16px;
`;

const OverlayListStyle = css`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

const OverlayAddressStyle = css`
  width: 100%;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #4f63d2;
  color: white;
  font-size: 12px;
`;

const useMarkerInfo = () => {
  const { isLoading, error, data } = useQuery("markerInfo", GetMarkerInfo);
  return { isLoading, error, markerInfo: data };
};

const BranchShareInfoComponent = ({
  id,
  setIsOpen,
  address,
  name,
}: BranchShareInfoComponentProps) => {
  const { markerInfo } = useMarkerInfo();

  useEffect(() => {
    if (markerInfo) {
      console.log(markerInfo);
    }
  }, [markerInfo]);

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
      <div css={OverlayListStyle}></div>
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

export default BranchShareInfoComponent;
