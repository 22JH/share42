/** @jsxImportSource @emotion/react */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserHome from "./routes/userHome/UserHome";
import NavBar from "./components/NavBar";
import Login from "./routes/auth/logIn/Login";
import { css, Global } from "@emotion/react";
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
  const { pathname } = window.location

  useEffect(() => {
    if (pathname === '/useshare' || pathname === '/admin/usemap' || pathname === '/share-registration') {
      setNotNav(false)
    } else {
      setNotNav(true)
    }
  }, [pathname])

  return (
    <>
      <Global styles={globalStyle} />
      { notNav ? <NavBar /> : null }
      <Router>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/useshare" element={<UseMapComponent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
