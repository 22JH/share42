/* eslint-disable max-len */
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
import UserNfc from "./routes/user/UserNfc";
import UserMyPageShare from "./routes/userHome/UserMyPageShare";
import UserMyPageLike from "./routes/userHome/UserMyPageLike";
import UserMyPageMyArticles from "./routes/userHome/UserMyPageMyArticles";
import UserCommunity from "./routes/user/UserCommunity";
import CommunityNavBar from "./components/NavBar/CommunityNavBar";
import UserCommunityReg from "./routes/user/UserCommunityReg";
import UserInfoModify from "./routes/auth/UserInfoModify";
import RouterGuard from "./components/auth/RouterGuard";
import UserChatList from "./routes/user/UserChatList";
import UserCommunityDetail from "./routes/user/UserCommunityDetail";
import AdminLogin from "./routes/auth/AdminLogin";
import LoginRaouterGuard from "./components/auth/LoginRouterGuard";
import SharePageNavBar from "./components/NavBar/SharePageNavBar";
import UserShareCategorySelect from "./routes/user/UserShareCategorySelect";
import UserReturn from "./routes/user/UserReturn";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useGetUserToken } from "./hooks/useGetToken";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import EnterRaouterGuard from "./components/auth/EnterRouterGuard";

const globalStyle = css`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function App() {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const TOKEN = useGetUserToken();

  useEffect(() => {
    // pwa 권한 설정
    async function requestNotificationPermission() {
      try {
        const permission: any = await Notification.requestPermission();
        setPermissionStatus(permission);
      } catch (error) {
        console.error("Error while requesting notification permission:", error);
      }
    }

    if ("Notification" in window) {
      requestNotificationPermission();
    } else {
      console.error("This browser does not support notifications.");
    }

    if (permissionStatus === "granted") {
      const notification = new Notification("알림 예제입니다", {
        body: "Wrtn 봇 측으로부터 오는 알림입니다.",
      });
      axios({
        method: "get",
        url: `https://www.share42-together.com/api/common/pwa`,
      }).then((res) => {
        localStorage.setItem("VAPID", res.data.message.publicKey);

        const messaging = getMessaging();

        getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIREBASE_PUBLIC_KEY,
        })
          .then((currentToken) => {
            if (currentToken) {
              // Send the token to your server and update the UI if necessary
              // ...
            } else {
              // Show permission request UI
              console.log(
                "No registration token available. Request permission to generate one."
              );
              // ...
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ");
            // ...
          });
        onMessage(messaging, (payload) => {
          console.log("Message received. ");
          // ...
        });
      });
    } else {
      console.error("알림 권한을 허용해주세요.");
    }
  }, [permissionStatus]);

  return (
    <>
      <Global styles={globalStyle} />
      <Router>
        <Routes>
          {/* 유저 홈 */}
          <Route element={<RouterGuard />}>
            {/* 홈 */}
            <Route element={<HomeNavBar />}>
              <Route path="/home" element={<UserHome />} />
            </Route>

            {/* 유저 마이페이지 */}
            <Route element={<MyPageNavBar />}>
              <Route path="/user/mypage" element={<UserMyPage />} />
              <Route path="/user/mypage/usage" element={<UserMyPageUsage />} />
              <Route path="/user/nfc" element={<UserNfc />} />
              <Route path="/user/mypage/share" element={<UserMyPageShare />} />
              <Route path="/user/mypage/like" element={<UserMyPageLike />} />
              <Route
                path="/user/mypage/articles"
                element={<UserMyPageMyArticles />}
              />
              <Route path="/user/chat/:chatName" element={<UserChat />} />
              <Route path="/user/chatlist" element={<UserChatList />} />
              <Route path="/user/mypage/modify" element={<UserInfoModify />} />
              <Route path="/user/payment" element={<UserPay />} />
              <Route path="/user/report" element={<UserReport />} />
              <Route path="/user/map" element={<UserMap />} />
              <Route path="/admin/map" element={<AdminMap />} />
            </Route>

            {/* 관리자 */}
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/report" element={<AdminReport />} />
            <Route path="/admin/log" element={<AdminLog />} />
            <Route path="/admin/operation" element={<AdminOperation />} />
          </Route>

          {/* 공유 등록 페이지, 등록된 공유 상세 페이지*/}
          <Route element={<SharePageNavBar />}>
            <Route path="/user/share-reg" element={<UserShareReg />} />
            <Route
              path="/user/share-category"
              element={<UserShareCategorySelect />}
            />
            <Route path="/user/return" element={<UserReturn />} />
            <Route path="/user/share-post/:id" element={<UserSharePost />} />
          </Route>

          {/* 커뮤니티 */}
          <Route element={<CommunityNavBar />}>
            <Route path="/user/community" element={<UserCommunity />} />
            <Route path="/user/community/reg" element={<UserCommunityReg />} />
            <Route
              path="/user/community/:id"
              element={<UserCommunityDetail />}
            />
          </Route>

          <Route element={<LoginRaouterGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>

          {/* 다시 홈으로 들어오면 토큰 검사 */}
          <Route element={<EnterRaouterGuard />}>
            <Route path="/" element={<UserWelcome />} />
            <Route path="/start" element={<UserBeforeMain />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
