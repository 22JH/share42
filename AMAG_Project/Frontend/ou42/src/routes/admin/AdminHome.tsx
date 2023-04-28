import AdminHomeChart from "../../components/admin/home/AdminHomeChart";
import AdminHomeMenuBtn from "../../components/admin/home/AdminHomeMenuBtn";
import AdminHomeTitle from "../../components/admin/home/AdminHomeTitle";

function AdminHome() {
  return (
    <div style={{ width: "100vw", height: "85vh" }}>
      {/* 타이틀 */}
      <AdminHomeTitle />
      {/* 차트 */}
      <AdminHomeChart />
      {/* 메뉴 버튼 */}
      <AdminHomeMenuBtn />
    </div>
  );
}

export default AdminHome;
