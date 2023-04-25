/** @jsxImportSource @emotion/react */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { css, Global } from "@emotion/react";
import UserHome from "./routes/userHome/UserHome";
import NavBar from "./components/NavBar";
import Login from "./routes/auth/Login";
import AdminHome from "./routes/admin/AdminHome";
import AdminReport from "./routes/admin/AdminReport";
import AdminLog from "./routes/admin/AdminLog";
import KakaoMap from "./components/map/kakaoMap";
import Terms from "./routes/auth/Terms";
import SignUp from "./routes/auth/SignUp";

const globalStyle = css`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function App() {
  const pathName = window.location.pathname;

  return (
    <>
      <Global styles={globalStyle} />
      {!pathName.includes("admin") ? <NavBar /> : null}
      <Router>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/report" element={<AdminReport />} />
          <Route path="/admin/log" element={<AdminLog />} />
          <Route path="/Kakaomap" element={<KakaoMap />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
