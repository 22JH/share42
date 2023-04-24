import AdminLogContents from "../../components/admin/log/AdminLogContents";
import AdminSelectBox from "../../components/admin/AdminSelectBox";
import AdminNav from "./../../components/admin/AdminNav";

function AdminLog() {
  return (
    <>
      {/* 네브바 */}
      <AdminNav />
      {/* 선택 박스 */}
      <AdminSelectBox />
      {/* 컨텐츠 */}
      <AdminLogContents />
    </>
  );
}

export default AdminLog;