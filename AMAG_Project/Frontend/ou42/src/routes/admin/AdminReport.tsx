/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import AdminReportContent from "../../components/admin/report/AdminReportContent";
import AdminReportNav from "../../components/admin/report/AdminReportNav";
import BottomMenuBar from "../../components/BottomMenuBar";
import { useState } from "react";

const container = css`
  width: 100vw;
  height: 80vh;
`;

function AdminReport() {
  const [count, setCount] = useState<number>(0);

  return (
    <div css={container}>
      {/* 네브바 */}
      <AdminReportNav count={count} />
      {/* 컨텐츠 */}
      <AdminReportContent setCount={setCount} />
      {/* 하단 네브바 */}
      <BottomMenuBar />
    </div>
  );
}
export default AdminReport;
