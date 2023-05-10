/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */

import axios from "axios";
import { useEffect, useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import MarkerInfoComponent from "./MarkerInfoComponent";
import MarkerShareInfoComponent from "./MarkerShareInfoComponent";
import { CustomOverlayMapComponentProps } from "./type/MapType";

const page = 1;
const size = 20;

export interface markerInfoTypes {
  lockerNumber: number;
  error: boolean;
  shareArticleAccountNickname: string;
  shareArticleId: number;
  shareArticleName: string;
  shareArticleSharePrice: number;
  shareArticleShareStatus: number;
}

const CustomOverlayMapComponent = ({
  marker,
  position,
  pathname,
  isOpen,
  isVisible,
  handleMarkerInfo,
  setIsVisible,
  setIsOpen,
  markerId,
}: CustomOverlayMapComponentProps) => {
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;
  const [tempArray, setTempArray] = useState<markerInfoTypes[]>([]);
  const [markerInfo, setMarkerInfo] = useState<markerInfoTypes[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [useCount, setUseCount] = useState<number>(0);

  // 해당 마커 상세 정보 가져오기
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://www.share42-together.com:8088/api/common/locker/detail/${page}/${size}/${marker.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setTotalCount(response.data.message.totalCount);
      setUseCount(response.data.message.useCount);
      setTempArray(response.data.message.lockerList)
    })
    .catch((e) => console.log(e))
  }, []);

  useEffect(() => {
    if (tempArray.length > 0) {
      const copyArray = [...tempArray]
      const sortedData = copyArray.sort((a, b) => a.lockerNumber - b.lockerNumber);
      setMarkerInfo(sortedData);
    }
  }, [tempArray])

  return (
    <>
      {pathname?.includes("user/map") || pathname?.includes("admin/map") ? (
        isVisible[marker.id] === true ? (
          <CustomOverlayMap
            position={{
              lat: position.lat - 0.002,
              lng: position.lng,
            }}
          >
            <MarkerShareInfoComponent
              marker={marker}
              handleMarkerInfo={handleMarkerInfo}
              name={marker.name}
              totalCount={totalCount}
              useCount={useCount}
              setIsVisible={setIsVisible}
              markerId={markerId}
              setIsOpen={setIsOpen}
              position={position}
            />
          </CustomOverlayMap>
        ) : isOpen[marker.id] === true ? (
          <div
            style={{
              position: "fixed",
            }}
          >
            <CustomOverlayMap
              position={{
                lat: position.lat,
                lng: position.lng,
              }}
            >
              <MarkerInfoComponent
                id={marker.id}
                handleMarkerInfo={handleMarkerInfo}
                address={marker.address}
                name={marker.name}
                markerInfo={markerInfo}
              />
            </CustomOverlayMap>
          </div>
        ) : null
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
            name={marker.name}
            totalCount={totalCount}
            useCount={useCount}
          />
        </CustomOverlayMap>
      ) : null}
    </>
  );
};

export default CustomOverlayMapComponent;
