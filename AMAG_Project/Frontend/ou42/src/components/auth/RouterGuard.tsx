import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Alert from "../UI/Alert";

export default function RaouterGuard() {
  const url = useLocation().pathname;
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) Alert("error", "로그인이 필요합니다.", navigate("/login"));
  }, [url]);
  return <Outlet />;
}
