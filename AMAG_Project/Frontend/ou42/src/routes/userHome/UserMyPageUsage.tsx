import { useEffect, useState } from "react";
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
    <div style={{ width: "100vw", height: "85vh" }}>
      <UserMyPageListBtn setValue={setValue} value={value} />
      <UserMyPageList />
    </div>
  );
}

export default UserMyPageUsage;
