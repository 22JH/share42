import AdminReportContent from "../../components/admin/report/AdminReportContent";
import AdminReportNav from "../../components/admin/report/AdminReportNav";
import BottomMenuBar from "../../components/BottomMenuBar";

function AdminReport() {
  return (
    <>
      {/* 네브바 */}
      <AdminReportNav />
      {/* 컨텐츠 */}
      <AdminReportContent />
      {/* 하단 네브바 */}
      <BottomMenuBar />
    </>
  );
}
export default AdminReport;
