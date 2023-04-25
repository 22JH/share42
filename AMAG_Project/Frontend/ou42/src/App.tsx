/** @jsxImportSource @emotion/react */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { css, Global } from "@emotion/react";
import UserHome from "./routes/userHome/UserHome";
import NavBar from "./components/NavBar";
import Login from "./routes/auth/Login";
import AdminHome from "./routes/admin/AdminHome";
import AdminReport from "./routes/admin/AdminReport";
import AdminLog from "./routes/admin/AdminLog";
import UseMapComponent from "./components/map/UseMapComponent";
import Terms from "./routes/auth/Terms";
import SignUp from "./routes/auth/SignUp";
import { useState } from 'react';
import { useEffect } from 'react';

const globalStyle = css`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function App() {
  const [notNav, setNotNav] = useState(true);
  const pathName = window.location.pathname;

  useEffect(() => {
    if (pathName === '/useshare/usemap' || pathName === '/admin/usemap' || pathName === '/share-registration') {
      setNotNav(false)
    } else {
      setNotNav(true)
    }
  }, [pathName])

  return (
    <>
      <Global styles={globalStyle} />
      {!pathName.includes("admin") ? <NavBar /> : null}
      {!pathName.includes("useshare") ? <NavBar /> : null}
      { notNav ? <NavBar /> : null }
      <Router>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/report" element={<AdminReport />} />
          <Route path="/admin/log" element={<AdminLog />} />
          <Route path="/useshare/usemap" element={<UseMapComponent />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
