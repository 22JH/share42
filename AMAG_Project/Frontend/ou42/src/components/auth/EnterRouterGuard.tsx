import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function EnterRaouterGuard() {
  useEffect(() => {
    const loginInfo = localStorage.getItem("loginInfo");
    if (loginInfo) {
      const parsedLoginInfo = JSON.parse(loginInfo);
      const expire = parsedLoginInfo.expire;

      if (Date.now() > expire) {
        localStorage.removeItem("loginInfo");
      }
    }
  }, []);
  return <Outlet />;
}
