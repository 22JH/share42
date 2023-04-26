/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { markerProps } from "./MapComponent";
import { useStore } from "./store/useStore";
import { OverlayShareStyle } from "./style/UserMapStyle";

export interface MarkerShareInfoComponentProps {
  marker: markerProps;
  handleMarkerInfo: (id: number) => void;
}

const MarkerShareInfoComponent = ({
  marker,
  handleMarkerInfo,
}: MarkerShareInfoComponentProps) => {
  const { branchChoice, setBranchChoice } = useStore();
  const { isOpenMap, setIsOpenMap } = useStore();

  const handleChoiceName = (name: string) => {
    setBranchChoice(name);
    setIsOpenMap(false)
  };

  return (
    <>
      <div css={OverlayShareStyle} onClick={() => handleMarkerInfo(marker.id)}>
        <div
          style={{
            fontSize: "1.6rem",
            fontWeight: "900",
            marginBottom: "1.2rem",
          }}
        >
          {marker.content}
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
          {`사물함 갯수 / 사용가능 : ` +
            marker.cabinetCnt +
            ` / ` +
            marker.cabinetUse}
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
          onClick={() => handleChoiceName(marker.content)}
        >
          <span>선택하기</span>
        </div>
      </div>
    </>
  );
};

export default MarkerShareInfoComponent;
