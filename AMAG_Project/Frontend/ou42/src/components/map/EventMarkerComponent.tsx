/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { useLocation } from "react-router-dom";
import pinkBox from "../../assets/pinkBox.png";
import CustomOverlayMapComponent from "./CustomOverlayMapComponent";
import { EventMarkerComponentProps } from "./type/MapType";

const EventMarkerComponent = ({
  marker,
  position,
}: EventMarkerComponentProps) => {
  const map = useMap();
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});
  const { pathname } = useLocation();

  // 오버레이 키고 끄는 것
  const handleMarkerInfo = (id: number) => {
    if (pathname.includes("user/map") || pathname.includes("admin/map")) {
      if (isVisible[id] === true) {
        setIsVisible((prevState) => ({ ...prevState, [id]: false }));
      } else {
        // setIsOpen((prevState) => ({ ...prevState, [id]: true }));
        setIsVisible((prevState) => ({ ...prevState, [id]: true }));
      }

      if (isOpen[id] === true) {
        setIsOpen((prevState) => ({ ...prevState, [id]: false }));
        setIsVisible((prevState) => ({ ...prevState, [id]: false }));
      }
    } else if (pathname.includes("share-reg")) {
      if (isVisible[id] === true) {
        setIsVisible((prevState) => ({ ...prevState, [id]: false }));
      } else {
        setIsVisible((prevState) => ({ ...prevState, [id]: true }));
      }
    }
    map.panTo(new kakao.maps.LatLng(position.lat, position.lng));
  };

  return (
    <div>
      <MapMarker
        position={{
          lat: marker.lat,
          lng: marker.lng,
        }}
        image={{
          src: pinkBox,
          size: {
            width: 60,
            height: 60,
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
        setIsVisible={setIsVisible}
        setIsOpen={setIsOpen}
        markerId={marker.id}
      />
    </div>
  );
};

export default EventMarkerComponent;
