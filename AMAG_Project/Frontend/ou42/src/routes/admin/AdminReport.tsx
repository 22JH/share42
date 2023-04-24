import AdminReportContent from "../../components/admin/report/AdminReportContent";
import AdminReportNav from "../../components/admin/report/AdminReportNav";

function AdminReport() {
  return (
    <>
      {/* 네브바 */}
      <AdminReportNav />
      {/* 컨텐츠 */}
      <AdminReportContent />
    </>
  );
}
export default AdminReport;
