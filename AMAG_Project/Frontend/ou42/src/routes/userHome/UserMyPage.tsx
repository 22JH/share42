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
    </div>
  );
}

export default UserMyPage;
