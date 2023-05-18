import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Alert from "../UI/Alert";

export default function RaouterGuard() {
  const url = useLocation().pathname;
  const navigate = useNavigate();
  useEffect(() => {
    const loginInfo = localStorage.getItem("loginInfo");
    if (loginInfo) {
      const parsedLoginInfo = JSON.parse(loginInfo);
      const expire = parsedLoginInfo.expire;

      if (Date.now() > expire) {
        localStorage.removeItem("loginInfo");
        Alert(
          "error",
          "로그인이 만료되었습니다. 다시 로그인 해주세요.",
          navigate(url.includes("admin") ? "/admin/login" : "/login")
        );
      }
    } else {
      Alert("error", "로그인이 필요합니다.", navigate("/login"));
    }
  }, [url]);
  return <Outlet />;
}
