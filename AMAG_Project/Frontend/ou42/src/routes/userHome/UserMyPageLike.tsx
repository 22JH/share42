import { useEffect } from "react";
import BottomMenuBar from "../../components/BottomMenuBar";
import UserMyPageList from "../../components/user/mypage/UserMyPageList";
import navStore from "../../store/navStore";

function UserMyPageLike() {
  const { setPathTitle } = navStore();

  useEffect(() => {
    setPathTitle("관심 목록");
  }, []);

  return (
    <div style={{ width: "100vw", height: "81vh" }}>
      <UserMyPageList />
      <BottomMenuBar />
    </div>
  );
}

export default UserMyPageLike;
