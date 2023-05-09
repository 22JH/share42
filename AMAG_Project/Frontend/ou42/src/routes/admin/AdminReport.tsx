/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import AdminReportContent from "../../components/admin/report/AdminReportContent";
import AdminReportNav from "../../components/admin/report/AdminReportNav";
import BottomMenuBar from "../../components/BottomMenuBar";

const container = css`
  width: 100vw;
  height: 80vh;
`;

function AdminReport() {
  return (
    <div css={container}>
      {/* 네브바 */}
      <AdminReportNav />
      {/* 컨텐츠 */}
      <AdminReportContent />
      {/* 하단 네브바 */}
      <BottomMenuBar />
    </div>
  );
}
export default AdminReport;
