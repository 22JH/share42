/** @jsxImportSource @emotion/react */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserHome from "./routes/userHome/UserHome";
import NavBar from "./components/NavBar";
import Login from "./routes/auth/logIn/Login";
import { css, Global } from "@emotion/react";
import AdminHome from "./routes/admin/AdminHome";
import AdminReport from "./routes/admin/AdminReport";
import AdminLog from "./routes/admin/AdminLog";
import UseMapComponent from "./components/map/UseMapComponent";
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
