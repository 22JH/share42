/** @jsxImportSource @emotion/react */

import shareIsOpenStore from "../../store/shareIsOpenStore";
import { useBranchChoiceStore } from "./store/useBranchChoiceStore";
import { MarkerShareInfoComponentProps } from "./type/MapType";

const MarkerShareInfoComponent = ({
  marker,
  handleMarkerInfo,
}: MarkerShareInfoComponentProps) => {
  const { setBranchChoice } = useBranchChoiceStore();
  const { setIsOpenShareMap } = shareIsOpenStore();

  const handleChoiceName = (name: string, id: string | null) => {
    setBranchChoice({name, id});
    setIsOpenShareMap(false)
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
        }}
        onClick={() => handleMarkerInfo(marker.id)}
      >
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
          onClick={() => handleChoiceName(marker.content, String(marker.id))}
        >
          <span>선택하기</span>
        </div>
      </div>
    </>
  );
};

export default MarkerShareInfoComponent;
