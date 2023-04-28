import AdminNav from "../../components/admin/AdminNav";
import AdminSelectBox from "../../components/admin/AdminSelectBox";
import BottomMenuBar from "../../components/BottomMenuBar";

function AdminOperation() {
  return (
    <>
      {/* 네브바 */}
      <AdminNav />
      {/* 선택 박스 */}
      <AdminSelectBox />
      {/* 하단 네브바 */}
      <BottomMenuBar />
    </>
  );
}

export default AdminOperation;
