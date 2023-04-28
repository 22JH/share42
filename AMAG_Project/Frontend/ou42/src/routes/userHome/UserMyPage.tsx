import BottomMenuBar from "../../components/BottomMenuBar";
import UserMyPageETC from "../../components/user/mypage/UserMyPageETC";
import UserMyPageMyTrade from "../../components/user/mypage/UserMyPageMyTrade";
import UserMyPageProfile from "../../components/user/mypage/UserMyPageProfile";

function UserMyPage() {
  return (
    <div style={{ width: "100vw", height: "90vh" }}>
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
