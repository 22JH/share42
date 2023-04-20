/** @jsxImportSource @emotion/react */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "./routes/userHome/UserHome";
import NavBar from "./components/NavBar";
import Login from "./routes/auth/logIn/Login";
import { css, Global } from "@emotion/react";

const globalStyle = css`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
