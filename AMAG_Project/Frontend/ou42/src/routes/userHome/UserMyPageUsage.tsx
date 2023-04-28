import { useEffect, useState } from "react";
import BottomMenuBar from "../../components/BottomMenuBar";
import UserMyPageList from "../../components/user/mypage/UserMyPageList";
import UserMyPageListBtn from "../../components/user/mypage/UserMyPageListBtn";
import navStore from "../../store/navStore";

function UserMyPageUsage() {
  const { setPathTitle } = navStore();
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    setPathTitle("사용 내역");
  }, []);

  return (
    <div style={{ width: "100vw", height: "81vh" }}>
      <UserMyPageListBtn setValue={setValue} value={value} />
      <UserMyPageList />
      <BottomMenuBar />
    </div>
  );
}

export default UserMyPageUsage;
