/** @jsxImportSource @emotion/react */

import { Map, ZoomControl, MapTypeControl } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { mapStyle } from "./style/MapStyle";
import EventMarkerComponent from "./EventMarkerComponent";
import { MapComponentProps, positionProps } from "./type/MapType";

const MapComponent: React.FC<MapComponentProps> = ({ setIsOpenMap }) => {
  const [markersData, setMarkersData] = useState<null | any[]>(null);
  const [position, setPosition] = useState<positionProps>({
    lat: 36.107177733518384,
    lng: 128.4193003234078,
  });

  // 현재 위치 파악하기(geolocation)
  // const [currentPosition, setCurrentPosition] = useState<{
  //   center: { lat: number; lng: number };
  //   errMsg: string | null;
  //   isLoading: boolean;
  // }>({
  //   center: {
  //     lat: 36.10724367128168,
  //     lng: 128.4152504245959,
  //   },
  //   errMsg: null,
  //   isLoading: true,
  // });

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setCurrentPosition((prev) => ({
  //           ...prev,
  //           center: {
  //             lat: position.coords.latitude, // 위도
  //             lng: position.coords.longitude, // 경도
  //           },
  //           isLoading: false,
  //         }));
  //       },
  //       (err) => {
  //         setCurrentPosition((prev) => ({
  //           ...prev,
  //           errMsg: err.message,
  //           isLoading: false,
  //         }));
  //       }
  //     );
  //   } else {
  //     // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
  //     setCurrentPosition((prev) => ({
  //       ...prev,
  //       errMsg: "geolocation을 사용할수 없어요..",
  //       isLoading: false,
  //     }));
  //   }
  // }, []);

  // 마커 주소 가져오기
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3001/markers");
      const data = await response.json();
      setMarkersData(data);
    })();
  }, []);

  return (
    <>
      <Map // 지도를 표시할 Container
        id="map"
        css={mapStyle}
        center={{
          // 지도의 중심좌표
          lat: position.lat,
          lng: position.lng,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100vh",
        }}
        level={3} // 지도의 확대 레벨
        onDragEnd={(map) =>
          setPosition({
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          })
        }
      >
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        {markersData?.map((marker) => (
          <EventMarkerComponent
            key={marker.id}
            marker={marker}
            position={position}
            setIsOpenMap={setIsOpenMap}
          />
        ))}
      </Map>
    </>
  );
};

export default MapComponent;
