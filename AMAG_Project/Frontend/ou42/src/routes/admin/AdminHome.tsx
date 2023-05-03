import AdminHomeBarChart from "../../components/admin/home/AdminHomeBarChart";
import AdminHomeCircleChart from "../../components/admin/home/AdminHomeCircleChart";
import AdminHomeMenuBtn from "../../components/admin/home/AdminHomeMenuBtn";
import AdminHomeTitle from "../../components/admin/home/AdminHomeTitle";
import { useState } from "react";

function AdminHome() {
  const [isChange, setChange] = useState<boolean>(false);
  return (
    <div style={{ width: "100vw", height: "84vh" }}>
      {/* 타이틀 */}
      <AdminHomeTitle />
      {!isChange ? (
        // 원 차트
        <AdminHomeCircleChart setChange={setChange} />
      ) : (
        // 바 차트
        <AdminHomeBarChart setChange={setChange} />
      )}
      {/* 메뉴 버튼 */}
      <AdminHomeMenuBtn />
    </div>
  );
}

export default AdminHome;
