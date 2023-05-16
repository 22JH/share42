import firebase from "firebase/app";
import "firebase/messaging";

const apiKey = process.env.RREACT_APP_FIREBASE_API_KEY;
const authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const storageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_FIREBASE_APP_ID;
const measurementId = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;

// Firebase 초기화
firebase.initializeApp({
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
});

// Firebase Messaging 객체 생성
const messaging = firebase.messaging();

// 알림 권한 요청
Notification.requestPermission().then((permission) => {
  // 권한이 허용되지 않은 경우
  if (permission !== "granted") {
    console.error("알림 권한이 거부됨");
    return;
  }

  // 기기 등록
  messaging
    .getToken()
    .then((token: string) => {
      console.log("기기 등록 성공:", token);
      // 서버로 기기 등록 정보를 전달하는 등 로직을 수행할 수 있음
    })
    .catch((error: Error) => {
      console.error("기기 등록 실패:", error);
    });
});

// 백그라운드 메시지 핸들러 등록
messaging.onBackgroundMessage((payload: any) => {
  console.log("백그라운드 메시지 수신:", payload);
  // 포그라운드에서 알림 처리, 페이지 새로고침 등
});
