/** @jsxImportSource @emotion/react */

import { useState } from "react";
import {
  MapMarker,
} from "react-kakao-maps-sdk";
import { useLocation } from "react-router-dom";
import markerImg from "../../assets/marker.png";
import CustomOverlayMapComponent from "./CustomOverlayMapComponent";
import { EventMarkerComponentProps } from "./type/MapType";

const EventMarkerComponent = ({
  marker,
  position,
}: EventMarkerComponentProps) => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});
  const { pathname } = useLocation();

  const handleMarkerInfo = (id: number) => {
    if (pathname.includes("user/map") || pathname.includes("admin/map")) {
      if (isOpen[id] === true) {
        setIsOpen((prevState) => ({ ...prevState, [id]: false }));
      } else {
        setIsOpen((prevState) => ({ ...prevState, [id]: true }));
      }
    } else if (pathname.includes("share-reg")) {
      if (isVisible[id] === true) {
        setIsVisible((prevState) => ({ ...prevState, [id]: false }));
      } else {
        setIsVisible((prevState) => ({ ...prevState, [id]: true }));
      }
    }
  };

  return (
    <div>
      <MapMarker
        position={{
          lat: marker.lat,
          lng: marker.lng,
        }}
        image={{
          src: markerImg,
          size: {
            width: 100,
            height: 100,
          },
          options: {
            offset: {
              x: 50,
              y: 50,
            },
          },
        }}
        onClick={() => handleMarkerInfo(marker.id)}
        clickable={true}
      />
      <CustomOverlayMapComponent
        marker={marker}
        position={position}
        pathname={pathname}
        isOpen={isOpen}
        isVisible={isVisible}
        handleMarkerInfo={handleMarkerInfo}
      />
    </div>
  );
};

export default EventMarkerComponent;
