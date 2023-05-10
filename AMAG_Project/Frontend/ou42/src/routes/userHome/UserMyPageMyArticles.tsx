/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect } from "react";
import navStore from "../../store/navStore";
import UserMyPageChart from "../../components/user/mypage/UserMyPageChart";
import BottomMenuBar from "../../components/BottomMenuBar";

const container = css`
  width: 100vw;
  height: 85vh;
`;
function UserMyPageMyArticles() {
  const { setPathTitle } = navStore();

  useEffect(() => {
    setPathTitle("내가 쓴 글");
  }, []);

  return (
    <div css={container}>
      <BottomMenuBar />
    </div>
  );
}

export default UserMyPageMyArticles;
