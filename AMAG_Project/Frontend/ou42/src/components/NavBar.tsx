/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import HomeNavBar from "./NavBar/HomeNavBar";
import { useStore } from "./map/store/useStore";

export default function NavBar() {
  const pathName = window.location.pathname;
  const { shareData } = useStore.getState();

  // 네브바 없는 페이지
  if (
    pathName.includes("admin") ||
    pathName.includes("map") ||
    pathName.includes("share-reg") ||
    pathName === "/" ||
    pathName === "/start"
  )
    return null;
  if (pathName === "/user/share-reg") {
    const handleSubmit = () => {
      // 버튼 누르면 서버로 전송하고 홈화면으로 가면됨
      // navigate('/')
    };
  }
  if (pathName === "/home") {
    // 검색 함수
    return <HomeNavBar />;
  }
  return (
    <>
      <div>NavBar</div>
    </>
  );
}
