import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: React.FC = () => {
  const { kakao } = window;
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    let newMap = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    setMap(newMap);
  }, []);

  function setCenter() {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);

    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
  }

  function panTo() {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(33.45058, 126.574942);

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
  }

  return (
    <>
      <div id="map" style={{ width: "100%", height: "350px" }}></div>
      <p>
        <button onClick={setCenter}>지도 중심좌표 이동시키기</button>
        <button onClick={panTo}>지도 중심좌표 부드럽게 이동시키기</button>
      </p>
    </>
  );
};

export default KakaoMap;
