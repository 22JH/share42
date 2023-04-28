import { useEffect } from "react";
import navStore from "../../store/navStore";
import UserMyPageChart from "./../../components/user/mypage/UserMyPageChart";

function UserMyPageStatistics() {
  const { setPathTitle } = navStore();

  useEffect(() => {
    setPathTitle("통계");
  }, []);

  return (
    <>
      <UserMyPageChart />
    </>
  );
}

export default UserMyPageStatistics;
