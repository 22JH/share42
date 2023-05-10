/** @jsxImportSource @emotion/react */

import { CustomOverlayMap } from "react-kakao-maps-sdk";
import MarkerInfoComponent from "./MarkerInfoComponent";
import MarkerShareInfoComponent from "./MarkerShareInfoComponent";
import { CustomOverlayMapComponentProps } from "./type/MapType";

const CustomOverlayMapComponent = ({
  marker,
  position,
  pathname,
  isOpen,
  isVisible,
  handleMarkerInfo,
}: CustomOverlayMapComponentProps) => {
  
  return (
    <>
      {(pathname?.includes("user/map") || pathname?.includes("admin/map")) &&
      isOpen[marker.id] ? (
        <CustomOverlayMap
          position={{
            lat: position.lat - 0.00022,
            lng: position.lng,
          }}
        >
          <MarkerInfoComponent
            id={marker.id}
            handleMarkerInfo={handleMarkerInfo}
            address={marker.address}
            name={marker.content}
          />
        </CustomOverlayMap>
      ) : null}
      {pathname?.includes("share-reg") && isVisible[marker.id] ? (
        <CustomOverlayMap
          position={{
            lat: position.lat - 0.002,
            lng: position.lng,
          }}
        >
          <MarkerShareInfoComponent
            marker={marker}
            handleMarkerInfo={handleMarkerInfo}
          />
        </CustomOverlayMap>
      ) : null}
    </>
  );
};

export default CustomOverlayMapComponent;
