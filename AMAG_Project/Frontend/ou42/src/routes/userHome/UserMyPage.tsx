import BottomMenuBar from "../../components/BottomMenuBar";
import UserMyPageETC from "../../components/user/mypage/UserMyPageETC";
import UserMyPageMyTrade from "../../components/user/mypage/UserMyPageMyTrade";
import UserMyPageProfile from "../../components/user/mypage/UserMyPageProfile";
import { useEffect } from "react";
import navStore from "./../../store/navStore";

function UserMyPage() {
  const { setPathTitle } = navStore();
  useEffect(() => {
    setPathTitle("마이 페이지");
  }, []);

  return (
    <div style={{ width: "100vw", height: "85vh" }}>
      {/* 프로필 */}
      <UserMyPageProfile />
      {/* 나의 거래 */}
      <UserMyPageMyTrade />
      {/* 기타 */}
      <UserMyPageETC />
      {/* 하단 메뉴 */}
      <BottomMenuBar />
    </div>
  );
}

export default UserMyPage;
