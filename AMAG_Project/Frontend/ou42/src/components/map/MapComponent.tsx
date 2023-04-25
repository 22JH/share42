/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import {
  Map,
  ZoomControl,
  MapTypeControl,
  MapMarker,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import markerImg from "../../assets/marker.png";
import MarkerInfoComponent from "./MarkerInfoComponent";
import { mapStyle } from "./style/UserMapStyle";

interface positionProps {
  lat: number;
  lng: number;
}

const MapComponent: React.FC = () => {
  const [markersData, setMarkersData] = useState<null | any[]>(null);
  const [position, setPosition] = useState<positionProps>({
    lat: 36.107177733518384,
    lng: 128.4193003234078,
  });
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});

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

  useEffect(() => {
    console.log(markersData)
  }, [markersData])

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
          <div key={marker.id}>
            <MapMarker
              key={marker.id}
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
              onClick={() => {
                setIsOpen((prevState) => ({ ...prevState, [marker.id]: true }));
              }}
              clickable={true}
            />
            <CustomOverlayMap
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            >
              <div
                className="label"
                style={{
                  color: "#fff",
                  position: "relative",
                  backgroundColor: "#0CDEE8",
                  padding: "8px 13px",
                  top: "40px",
                  fontSize: "13px",
                  fontWeight: 900,
                  borderRadius: "50px",
                  userSelect: "none",
                  zIndex: 2,
                  cursor: "pointer",
                }}
              >
                <span className="center">{marker.content}</span>
              </div>
            </CustomOverlayMap>
            {isOpen[marker.id] ? (
              <CustomOverlayMap
                position={{
                  lat: position.lat - 0.00022,
                  lng: position.lng,
                }}
              >
                <MarkerInfoComponent
                  id={marker.id}
                  setIsOpen={setIsOpen}
                  address={marker.address}
                  name={marker.content}
                />
              </CustomOverlayMap>
            ) : null}
          </div>
        ))}
      </Map>
    </>
  );
};

export default MapComponent;
