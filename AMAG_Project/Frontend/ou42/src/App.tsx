/** @jsxImportSource @emotion/react */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { css, Global } from "@emotion/react";
import UserHome from "./routes/userHome/UserHome";
import NavBar from "./components/NavBar";
import Login from "./routes/auth/Login";
import AdminHome from "./routes/admin/AdminHome";
import AdminReport from "./routes/admin/AdminReport";
import AdminLog from "./routes/admin/AdminLog";
import AdminOperation from "./routes/admin/AdminOperation";
import UseMapComponent from "./components/map/UseMapComponent";
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
      {!pathName.includes("admin") ? (
        !pathName.includes("usemap") ? (
          <NavBar />
        ) : null
      ) : null}

      <Router>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/report" element={<AdminReport />} />
          <Route path="/admin/log" element={<AdminLog />} />
          <Route path="/admin/operation" element={<AdminOperation />} />
          <Route path="/useshare/usemap" element={<UseMapComponent />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
