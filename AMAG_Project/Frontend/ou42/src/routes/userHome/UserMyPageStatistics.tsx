/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect } from "react";
import navStore from "../../store/navStore";
import UserMyPageChart from "./../../components/user/mypage/UserMyPageChart";

const container = css`
  width: 100vw;
  height: 85vh;
`;
function UserMyPageStatistics() {
  const { setPathTitle } = navStore();

  useEffect(() => {
    setPathTitle("통계");
  }, []);

  return (
    <div css={container}>
      <UserMyPageChart />
    </div>
  );
}

export default UserMyPageStatistics;
