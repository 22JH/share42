/** @jsxImportSource @emotion/react */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { css, Global } from "@emotion/react";
import UserHome from "./routes/userHome/UserHome";
import NavBar from "./components/NavBar";
import Login from "./routes/auth/Login";
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
  return (
    <>
      <Global styles={globalStyle} />
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
