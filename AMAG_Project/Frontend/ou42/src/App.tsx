/** @jsxImportSource @emotion/react */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { css, Global } from "@emotion/react";
import UserHome from "./routes/userHome/UserHome";
import Login from "./routes/auth/Login";
import AdminHome from "./routes/admin/AdminHome";
import AdminReport from "./routes/admin/AdminReport";
import AdminLog from "./routes/admin/AdminLog";
import AdminOperation from "./routes/admin/AdminOperation";
import UserMap from "./routes/user/UserMap";
import Terms from "./routes/auth/Terms";
import SignUp from "./routes/auth/SignUp";
import UserWelcome from "./routes/userHome/UserWelcome";
import UserBeforeMain from "./routes/userHome/UserBeforeMain";
import AdminMap from "./routes/admin/AdminMap";
import UserShareReg from "./routes/user/UserShareReg";
import UserMyPage from "./routes/userHome/UserMyPage";
import UserPay from "./routes/user/UserPay";
import UserChat from "./routes/user/UserChat";
import HomeNavBar from "./components/NavBar/HomeNavBar";
import UserReport from "./routes/user/UserReport";
import UserSharePost from "./routes/user/UserSharePost";
import MyPageNavBar from "./components/NavBar/MyPageNavBar";
import UserMyPageUsage from "./routes/userHome/UserMyPageUsage";
import UserMyPageShare from "./routes/userHome/UserMyPageShare";
import UserMyPageLike from "./routes/userHome/UserMyPageLike";
import UserMyPageStatistics from "./routes/userHome/UserMyPageStatistics";

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
      <Router>
        <Routes>
          {/* 유저 홈 */}
          <Route element={<HomeNavBar />}>
            <Route path="/home" element={<UserHome />} />
          </Route>
          {/* 유저 마이페이지 */}
          <Route element={<MyPageNavBar />}>
            <Route path="/user/mypage" element={<UserMyPage />} />
            <Route path="/user/mypage/usage" element={<UserMyPageUsage />} />
            <Route path="/user/mypage/share" element={<UserMyPageShare />} />
            <Route path="/user/mypage/like" element={<UserMyPageLike />} />
            <Route
              path="/user/mypage/stats"
              element={<UserMyPageStatistics />}
            />
          </Route>

          <Route path="/" element={<UserWelcome />} />
          <Route path="/start" element={<UserBeforeMain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/report" element={<AdminReport />} />
          <Route path="/admin/log" element={<AdminLog />} />
          <Route path="/admin/operation" element={<AdminOperation />} />
          <Route path="/user/map" element={<UserMap />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/map" element={<AdminMap />} />
          <Route path="/user/share-reg" element={<UserShareReg />} />
          <Route path="/user/payment" element={<UserPay />} />
          <Route path="/user/chat" element={<UserChat />} />
          <Route path="/user/report" element={<UserReport />} />
          <Route path="/user/share-post" element={<UserSharePost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
