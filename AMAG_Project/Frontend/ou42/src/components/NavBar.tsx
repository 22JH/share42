/** @jsxImportSource @emotion/react */
import HomeNavBar from "./NavBar/HomeNavBar";

export default function NavBar() {
  const pathName = window.location.pathname;
  // const { shareData } = useShareDataStore.getState();

  if (
    pathName.includes("admin") ||
    pathName.includes("map") ||
    pathName.includes("share-reg")
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
